# Generated by Django 2.1.1 on 2018-09-25 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapapp', '0002_auto_20180925_0953'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uploadmodel',
            name='document',
            field=models.FileField(null=True, upload_to='uploads/'),
        ),
    ]
