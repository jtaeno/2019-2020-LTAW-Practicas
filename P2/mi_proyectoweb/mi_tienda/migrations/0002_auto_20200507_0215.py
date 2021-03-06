# Generated by Django 2.2.10 on 2020-05-07 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClaseAMG',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('stock', models.IntegerField(default=0)),
                ('combustible', models.CharField(choices=[('G', 'Gasolina')], max_length=1)),
                ('motor', models.CharField(choices=[('A', 'AMG - 620CV')], max_length=1)),
                ('precio', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='ClaseGLE',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('stock', models.IntegerField(default=0)),
                ('combustible', models.CharField(choices=[('H', 'Hibrido')], max_length=1)),
                ('motor', models.CharField(choices=[('N', 'Normal - 260CV'), ('A', 'AMG - 400CV')], max_length=1)),
                ('precio', models.FloatField()),
            ],
        ),
        migrations.AlterField(
            model_name='clasea',
            name='combustible',
            field=models.CharField(choices=[('D', 'Diesel')], max_length=1),
        ),
    ]
