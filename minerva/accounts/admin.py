from django.contrib import admin
from .models import UserAccount

class UserAccountAdmin(admin.ModelAdmin):
    model = UserAccount
    list_display = ('email', 'name' ,'id', 'is_superuser')

admin.site.register(UserAccount , UserAccountAdmin)