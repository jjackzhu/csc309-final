from django.urls import path

from subscriptions.views import AddUserCard, DeleteUserPlan, EditUserCard, \
    UserAddPlan, SubListView, UserCardView, UserEditPlan, UserPaymentsView, \
    UserPlanView

app_name = 'subscriptions'


urlpatterns = [
    path('', SubListView.as_view(), name='sub_plans'),
    path('unsubscribe/', DeleteUserPlan.as_view(), name='unsubscribe'),
    path('my_plan/', UserPlanView.as_view(), name='user_sub_plan'),
    path('my_card/', UserCardView.as_view(), name='user_card'),
    path('my_card/add/', AddUserCard.as_view(), name='add_user_card'),
    path('my_card/edit/', EditUserCard.as_view(), name='edit_user_card'),
    path('my_payments/', UserPaymentsView.as_view(), name='user_payments'),
    path('my_plan/add/', UserAddPlan.as_view(), name='user_add_plan'),
    path('my_plan/edit/', UserEditPlan.as_view(), name='user_edit_plan'),
]
