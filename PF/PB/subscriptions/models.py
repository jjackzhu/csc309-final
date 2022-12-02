from dateutil.relativedelta import relativedelta
from datetime import date, datetime

from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models


# Subscription plans


class SubPlan(models.Model):
    name = models.CharField(max_length=200, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    month_duration = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.name}: {self.price}'


class UserPlan(models.Model):
    user = models.OneToOneField("accounts.MyUser", related_name='user_sub_plan',
                                on_delete=models.CASCADE)
    sub_plan = models.ForeignKey(SubPlan, related_name='user_sub_plan',
                                 on_delete=models.SET_NULL, null=True,
                                 blank=True)
    expires_in = models.DateField(null=True, blank=True)

    # checks if user has paid for subscription
    def is_subscribed(self, date_check=date.today()):
        if self.expires_in is None:
            return False
        # if user unsubscribed, check if expiry date less than inputted date
        if not self.sub_plan:
            return date_check <= self.expires_in
        else:
            return True

    def extend_expiry(self):
        expiry_date = self.expires_in + \
                      relativedelta(months=+self.sub_plan.month_duration)
        self.expires_in = expiry_date
        self.save()

    def unsubscribe(self):
        self.sub_plan = None
        self.save()

    def change_sub_plan(self, sub_plan, card):
        # if self.sub_plan is None, this means that this user has prev
        # cancelled a sub_plan, must create new payments
        if not self.sub_plan:
            if not self.is_subscribed():
                payment = UserPayment.objects \
                    .create(user=self.user,
                            card=card,
                            card_num=card.card_num,
                            month_duration=sub_plan.month_duration,
                            amount=sub_plan.price,
                            date=date.today())
                payment.make_first_payment()
                self.expires_in = date.today() + \
                    relativedelta(months=+sub_plan.month_duration)
                self.save()
            else:
                payment = UserPayment.objects. \
                    filter(user=self.user, paid=True).latest('date')
            payment.create_future_payment_add_plan(sub_plan)

        elif self.sub_plan != sub_plan:
            # new sub_plan, delete future payments and recreate them with new
            # plan parameters
            future_payments = UserPayment.objects.filter(user=self.user,
                                                         paid=False)
            for payment in future_payments:
                payment.delete()
            last_payment = UserPayment.objects. \
                filter(user=self.user, paid=True).latest('date')
            last_payment.create_future_payment_change_plan(sub_plan)

    def __str__(self):
        if self.is_subscribed() and self.sub_plan:
            return f'{self.user}: {self.sub_plan.name}, expires in ' \
                   f'{self.expires_in}'
        else:
            return "user not subscribed"


class UserCard(models.Model):
    user = models.OneToOneField("accounts.MyUser",
                                on_delete=models.CASCADE)
    card_num = models.DecimalField(null=False, blank=False, max_digits=19,
                                   decimal_places=0)
    cvv = models.CharField(null=False, blank=False, max_length=3,
                           validators=[MinLengthValidator(3)])
    name = models.CharField(null=False, blank=False, max_length=120)
    expires_in = models.CharField(null=False, blank=False, max_length=5,
                                  validators=[
                                      RegexValidator(
                                          regex='((0[1-9]|1[0-2])\/[0-9]{2})',
                                          message='Expiry data must be in format MM/YY',
                                          code='invalid_expiry_date')])

    # checks expiry date of card against today's date
    def valid_card(self):
        expiry_date = datetime.strptime(self.expires_in, "%m/%y")
        return expiry_date.year > date.today().year or \
               (expiry_date.month >= date.today().month and
                expiry_date.year == date.today().year)

    def __str__(self):
        return f'{self.user} payment method: {self.name}, {self.card_num}, ' \
               f'{self.cvv}, {self.expires_in} '


class UserPayment(models.Model):
    user = models.ForeignKey("accounts.MyUser",
                             on_delete=models.CASCADE)
    card = models.ForeignKey(UserCard,
                             on_delete=models.SET_NULL, null=True)
    card_num = models.DecimalField(null=False, blank=False, max_digits=19,
                                   decimal_places=0)
    # months of subscriptions paid for, needed if subplan is deleted before
    # payment is made
    month_duration = models.IntegerField(null=False, blank=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(null=False, blank=False)
    # time is added when payment is paid off
    time = models.TimeField(default=None, null=True, blank=True)
    paid = models.BooleanField(default=False)

    # extends expiry date
    def make_payment(self):
        self.make_first_payment()
        user_plan = UserPlan.objects.get(user=self.user)
        user_plan.extend_expiry()
        self.save()

    # pays off payment and sets time of payment
    # (called when new plan added)
    def make_first_payment(self):
        self.paid = True
        now = datetime.now()
        self.time = now.time()
        self.save()

    # create future payment after just creating new sub_plan
    def create_future_payment_add_plan(self, sub_plan):
        card = UserCard.objects.get(user=self.user)
        plan_duration = sub_plan.month_duration
        price = sub_plan.price
        pay_date = self.date + relativedelta(months=+self.month_duration)

        UserPayment.objects.create(user=self.user,
                                   card=card,
                                   card_num=card.card_num,
                                   month_duration=plan_duration,
                                   amount=price,
                                   date=pay_date)

    def create_future_payment_change_plan(self, sub_plan):
        card = UserCard.objects.get(user=self.user)
        price = sub_plan.price
        pay_date = self.date + relativedelta(months=+self.month_duration)

        UserPayment.objects.create(user=self.user,
                                   card=card,
                                   card_num=card.card_num,
                                   month_duration=sub_plan.month_duration,
                                   amount=price,
                                   date=pay_date)

    # create future payment after paying off a payment
    def create_future_payment(self):
        user_plan = UserPlan.objects.get(user=self.user)
        card = UserCard.objects.get(user=self.user)
        plan_duration = user_plan.sub_plan.month_duration
        price = user_plan.sub_plan.price
        pay_date = self.date + relativedelta(
            months=+plan_duration) + relativedelta(months=+self.month_duration)

        UserPayment.objects.create(user=self.user,
                                   card=card,
                                   card_num=card.card_num,
                                   month_duration=plan_duration,
                                   amount=price,
                                   date=pay_date)

    def change_card(self):
        self.card_num = self.card.card_num
        self.save()

    def __str__(self):
        return f'{self.date} {self.time}: {self.amount} via payment method: ' \
               f'{self.card_num} for {self.month_duration} months'
