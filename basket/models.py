from django.db import models
from django.utils.translation import ugettext_lazy as _
from users.models import User


class Basket(models.Model):
    owner = models.ForeignKey(User, related_name='baskets', null=True)
    OPEN, MERGED, SAVED, FROZEN, SUBMITTED = ('Open', 'Merged','Saved', 'Frozen', 'Submitted')
    STATUS_CHOICES = (
        (OPEN, _("Open - currently active")),
        (MERGED, _("Merged - superceded by another basket")),
        (SAVED, _("Saved - for items to be purchased later")),
        (FROZEN, _("Frozen - the basket cannot be modified")),
        (SUBMITTED, _("Submitted - has been ordered at the checkout")),
    )
    status = models.CharField(max_length=128, default=OPEN, choices=STATUS_CHOICES)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'
