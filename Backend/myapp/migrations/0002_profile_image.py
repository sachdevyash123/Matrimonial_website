# Generated by Django 4.1.7 on 2023-09-08 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='image',
            field=models.ImageField(default=1, upload_to='profile/'),
            preserve_default=False,
        ),
    ]