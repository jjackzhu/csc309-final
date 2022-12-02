from datetime import date

from django.core.management.base import BaseCommand


# management command for checking if payments need to be done today
from subscriptions.models import UserPayment, UserPlan


class Command(BaseCommand):
    help = 'Makes all payments due today'

    def handle(self, *args, **kwargs):
        today = date.today()
        unpaid_payments = UserPayment.objects.filter(paid=False)

        for unpaid_payment in unpaid_payments:
            if unpaid_payment.date <= today:
                # if card invalid unsubscribe user
                if not unpaid_payment.card or not unpaid_payment.card.valid_card():
                    unpaid_payment.delete()
                    try:
                        plan = UserPlan.objects.get(user=unpaid_payment.user)
                        plan.unsubscribe()
                    except UserPlan.DoesNotExist:
                        pass
                else:
                    unpaid_payment.make_payment()
                    unpaid_payment.create_future_payment()
