from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager,
    AbstractUser, Group, PermissionsMixin)
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(username=username,
                          email=UserManager.normalize_email(email), )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        username = email
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('First name'), max_length=100, blank=True)
    last_name = models.CharField(_('Last name'), max_length=100, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    is_staff = models.BooleanField(_('Staff status'), default=False)
    is_active = models.BooleanField(_('Active'), default=True)
    date_joined = models.DateTimeField(_('date joined'),
                                       default=timezone.now)
    avatar = models.ImageField(upload_to='users', null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def get_full_name(self):
        if all([self.first_name, self.last_name]):
            full_name = '{0} {1}'.format(self.first_name, self.last_name)
            return full_name.strip()
        else:
            return self.email

    def get_short_name(self):
        return self.first_name
