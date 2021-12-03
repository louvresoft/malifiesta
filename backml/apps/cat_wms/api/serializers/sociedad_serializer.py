from rest_framework import serializers
from apps.cat_wms.models import Sociedad


class SociedadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sociedad
        exclude = ('state', 'created_date', 'modified_date', 'deleted_date')
