from rest_framework import serializers
from apps.cat_wms.models import Flotilla


class FlotillaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flotilla
        exclude = ('state', 'created_date', 'modified_date', 'deleted_date')