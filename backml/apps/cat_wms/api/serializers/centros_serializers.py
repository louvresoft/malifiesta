from rest_framework import serializers
from apps.cat_wms.models import Centro


class CentroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Centro
        exclude = ('state', 'created_date', 'modified_date', 'deleted_date')
