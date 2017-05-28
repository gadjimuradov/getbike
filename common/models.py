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


class MainSlider(models.Model):
    h1_title = models.CharField(max_length=255, blank=True, null=True)
    h2_title = models.CharField(max_length=255, blank=True, null=True)
    action_title = models.CharField(max_length=100, blank=True, null=True)
    img = models.ImageField(upload_to='common/sliders/')
    position = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.h1_title if self.h1_title else str(self.pk)

    class Meta:
        ordering = ('position',)
        verbose_name = 'Слайдер на главной странице'
        verbose_name_plural = 'Слайдер на главной странице'


class MainSettings(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    value = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Настройки сайта'
        verbose_name_plural = 'Настройки сайта'