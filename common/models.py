from django.db import models


class Page(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    url = models.URLField(blank=True, null=True)
    content = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Страница'
        verbose_name_plural = 'Страницы'



class HappyClient(models.Model):
    img = models.ImageField(upload_to='common/happy_clients/')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Счастливый клиент'
        verbose_name_plural = 'Счастливые клиенты'


class MainSettings(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    value = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Настройки сайта'
        verbose_name_plural = 'Настройки сайта'