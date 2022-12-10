from dateutil.relativedelta import relativedelta
from rest_framework import serializers
from datetime import date

from subscriptions.models import SubPlan, UserCard, UserPayment, UserPlan


class SubPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubPlan
        fields = ['id',
                  'name',
                  'price',
                  'month_duration']


class SubPlanUpdateSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_name')

    class Meta:
        model = SubPlan
        fields = ['name',
                  'price',
                  'month_duration']

    def get_name(self, obj):
        return obj.name


class UserSubPlanSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = UserPlan
        fields = ['username',
                  'sub_plan',
                  'expires_in']


class EditUserSubPlanSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')

    class Meta:
        model = UserPlan
        fields = ['user',
                  'sub_plan',
                  'expires_in',
                  ]

    def get_user(self, obj):
        return self.context['request'].user.id

    def create(self, validated_data):
        plan_duration = validated_data['sub_plan'].month_duration
        expiry_date = date.today() + relativedelta(months=+plan_duration)
        user = self.context['request'].user
        return super().create(validated_data | {'expires_in': expiry_date,
                                                'user': user})


class UserCardSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')

    class Meta:
        model = UserCard
        fields = ['user',
                  'name',
                  'card_num',
                  'cvv',
                  'expires_in']

    def get_user(self, obj):
        return self.context['request'].user.id

    def create(self, validated_data):
        user = self.context['request'].user
        return super().create(validated_data | {'user': user})


class UserPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPayment
        fields = ['card_num',
                  'amount',
                  'date']
