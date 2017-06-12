from django.db import models


# Create your models here.
class Payment(models.Model):
    class STATUS:
        PROCESSED = 'processed'
        HOLD = 'hold'
        CANCEL = 'cancel'
        SUCCESS = 'success'
        FAIL = 'fail'

        CHOICES = (
            (PROCESSED, 'Processed'),
            (HOLD, 'Hold'),
            (CANCEL, 'Cancel'),
            (SUCCESS, 'Success'),
            (FAIL, 'Fail'),
        )

    class PAYMENT_TYPE:
        PC = 'PC'
        AC = 'AC'
        GP = 'GP'
        MC = 'MC'
        WM = 'WM'
        SB = 'SB'
        AB = 'AB'
        MA = 'MA'
        PB = 'PB'
        QW = 'QW'
        QP = 'QP'

        CHOICES = (
            (PC, u'Кошелек Яндекс.Деньги'),
            (AC, u'Банковская карта'),
            (GP, u'Наличными через кассы и терминалы'),
            (MC, u'Счет мобильного телефона'),
            (WM, u'Кошелек WebMoney'),
            (SB, u'Сбербанк: оплата по SMS или Сбербанк Онлайн'),
            (AB, u'Альфа-Клик'),
            (MA, u'MasterPass'),
            (PB, u'Интернет-банк Промсвязьбанка'),
            (QW, u'QIWI Wallet'),
            (QP, u'Доверительный платеж (Куппи.ру)'),
        )
    order_number = models.CharField(max_length=64, null=True, blank=True)
    order_amount = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    invoice_id = models.CharField(max_length=64, blank=True, null=True)
    payment_type = models.CharField(max_length=2,default=PAYMENT_TYPE.PC,
                                    choices=PAYMENT_TYPE.CHOICES)

    status = models.CharField('Результата', max_length=16,
                              choices=STATUS.CHOICES,
                              default=STATUS.PROCESSED)

    created = models.DateTimeField(auto_now_add=True)
    performed_datetime = models.DateTimeField('Обработан', blank=True, null=True)

    def __str__(self):
        return 'Заказ номер {0}'.format(str(self.order_number))

    class Meta:
        ordering = ('-created', )
        verbose_name = 'платеж'
        verbose_name_plural = 'Платежи'