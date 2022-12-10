import json
from datetime import date

from dateutil.relativedelta import relativedelta

from rest_framework.generics import CreateAPIView, ListAPIView, \
    RetrieveAPIView, UpdateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from classes.models import ClassSchedule
from subscriptions.models import SubPlan, UserCard, UserPayment, UserPlan
from subscriptions.serializers import EditUserSubPlanSerializer, \
    SubPlanSerializer, UserCardSerializer, UserPaymentSerializer, \
    UserSubPlanSerializer


# lists all available sub plans
class SubListView(ListAPIView):
    queryset = SubPlan.objects.all()
    serializer_class = SubPlanSerializer


# check if user has a plan, returns correct url
class UpdateUserPlanRedirect(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request)
        try:
            UserPlan.objects.get(user=self.request.user)
            return Response({"redirect": "edit"})
        except UserPlan.DoesNotExist:
            return Response({"redirect": "add"})


# user adding sub plan if they've never subscribed
class UserAddPlan(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditUserSubPlanSerializer

    def post(self, *args, **kwargs):
        try:
            UserPlan.objects.get(user=self.request.user)
            return Response({"detail": "user already has a plan; editing "
                                       "plans is supported"})
        except UserPlan.DoesNotExist:
            pass
        try:
            card = UserCard.objects.get(user=self.request.user)
            if not card.valid_card():
                return Response({"detail": "user's card is expired"})
            sub_plan = SubPlan.objects.get(id=self.request.data['sub_plan'])
            payment = UserPayment.objects. \
                create(user=self.request.user,
                       card=card,
                       card_num=card.card_num,
                       month_duration=sub_plan.month_duration,
                       amount=sub_plan.price,
                       date=date.today())
            payment.make_first_payment()
            payment.create_future_payment_add_plan(sub_plan)
            return super().post(*args, **kwargs)
        except UserCard.DoesNotExist:
            return Response({"detail": "user has not inputted a valid "
                                       "card for payment"})


# user edits their plan
class UserEditPlan(UpdateAPIView, RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditUserSubPlanSerializer

    def get_object(self):
        return get_object_or_404(UserPlan, user=self.request.user)

    def patch(self, request, *args, **kwargs):
        try:
            user_plan = UserPlan.objects.get(user=self.request.user)
            sub_plan = SubPlan.objects.get(id=self.request.data['sub_plan'])
        except UserPlan.DoesNotExist:
            return Response({"detail": "user does not have a sub plan; add a "
                                       "sub plan to allow updates"})
        try:
            card = UserCard.objects.get(user=self.request.user)
            if not card.valid_card():
                return Response({"detail": "user's card is expired"})
            user_plan.change_sub_plan(sub_plan, card)
            return super().patch(request, *args, **kwargs)
        except UserCard.DoesNotExist:
            return Response({"detail": "user has not inputted a valid "
                                       "card for payment"})

    def put(self, request, *args, **kwargs):
        try:
            user_plan = UserPlan.objects.get(user=self.request.user)
            sub_plan = SubPlan.objects.get(id=self.request.data['sub_plan'])
        except UserPlan.DoesNotExist:
            return Response({"detail": "user does not have a sub plan; add a "
                                       "sub plan to allow updates"})
        try:
            card = UserCard.objects.get(user=self.request.user)
            if not card.valid_card():
                return Response({"detail": "user's card is expired"})
            user_plan.change_sub_plan(sub_plan, card)
            return super().put(request, *args, **kwargs)
        except UserCard.DoesNotExist:
            return Response({"detail": "user has not inputted a valid "
                                       "card for payment"})


# view signed-in user's plan
class UserPlanView(RetrieveAPIView):
    serializer_class = UserSubPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserPlan.objects.get(user=self.request.user)

    def retrieve(self, *args, **kwargs):
        try:
            plan = self.get_object()
            serializer = UserSubPlanSerializer(plan)
            return Response(serializer.data)
        except UserPlan.DoesNotExist:
            return Response({'details': 'User is not subscribed'})


class DeleteUserPlan(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            plan = UserPlan.objects.get(user=self.request.user)
            plan.unsubscribe()

            # delete future payments
            future_payments = UserPayment.objects.filter(user=self.request.user,
                                                         paid=False)
            for payment in future_payments:
                payment.delete()

            # un-enroll users in all future courses
            classes = ClassSchedule.objects.filter(user=self.request.user)
            for class_i in classes:
                if class_i.classes.time.date() > plan.expires_in:
                    class_i.delete()
            return Response({"detail": "user unsubscribed"})
        except UserPlan.DoesNotExist:
            return Response({"detail": "user was not subscribed"})


# view current users card
class UserCardView(RetrieveAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserCard.objects.get(user=self.request.user)

    def retrieve(self, *args, **kwargs):
        try:
            card = self.get_object()
            serializer = UserCardSerializer(card,
                                            context={'request': self.request})
            return Response(serializer.data)
        except UserCard.DoesNotExist:
            return Response({'detail': 'User has not added a payment method'})


class UpdateUserCardRedirect(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            UserCard.objects.get(user=self.request.user)
            return Response({"redirect": "edit"})
        except UserCard.DoesNotExist:
            return Response({"redirect": "add"})


class AddUserCard(CreateAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            UserCard.objects.get(user=self.request.user)
            return Response({"detail": "user already has a card; editing "
                                         "card is supported"})
        except UserCard.DoesNotExist:
            return super().post(request, *args, **kwargs)


class EditUserCard(UpdateAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(UserCard, user=self.request.user)

    def update(self, request, *args, **kwargs):
        new_card = super().update(request, *args, **kwargs)

        # update payment method for future payments
        payments = UserPayment.objects.filter(user=self.request.user,
                                              paid=False)
        for payment in payments:
            payment.change_card()

        return new_card

    def patch(self, request, *args, **kwargs):
        try:
            UserCard.objects.get(user=self.request.user)
            return super().patch(request, *args, **kwargs)
        except UserCard.DoesNotExist:
            return Response({"detail": "user has not added a card"})

    def put(self, request, *args, **kwargs):
        try:
            UserCard.objects.get(user=self.request.user)
            return super().put(request, *args, **kwargs)
        except UserCard.DoesNotExist:
            return Response({"detail": "user has not added a card"})


# view current users payment history and future payments
class UserPaymentsView(ListAPIView):
    queryset = UserPayment
    serializer_class = UserPaymentSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        num_future_payments = request.GET.get('num_future_payments', '')
        num_future_payments = num_future_payments
        if not num_future_payments:
            num_future_payments = 0

        # past payments
        if num_future_payments == 0:
            payments = UserPayment.objects.filter(user=self.request.user,
                                                  paid=True)
        else:
            payments = UserPayment.objects.filter(user=self.request.user)
        delete_payments = []

        try:
            unpaid_payment = UserPayment.objects.get(user=self.request.user,
                                                     paid=False)
            duration = unpaid_payment.month_duration
            amount = unpaid_payment.amount
            date = unpaid_payment.date
            card = unpaid_payment.card
            card_num = unpaid_payment.card_num
            month_duration = unpaid_payment.month_duration

            # generate num_future_payments future payments
            for i in range(int(num_future_payments) - 1):
                date += relativedelta(months=+duration)
                payment = UserPayment.objects.create(
                    user=self.request.user,
                    card=card,
                    card_num=card_num,
                    month_duration=month_duration,
                    amount=amount,
                    date=date
                )
                delete_payments.append(payment)
        except UserPayment.DoesNotExist:
            pass

        page = self.paginate_queryset(payments)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            for p in delete_payments:
                p.delete()
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)

        for p in delete_payments:
            p.delete()

        return Response(serializer.data)
