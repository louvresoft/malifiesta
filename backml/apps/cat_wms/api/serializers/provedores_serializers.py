from rest_framework import serializers
from apps.cat_wms.models import Proveedor


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        exclude = ('state', 'created_date', 'modified_date', 'deleted_date')
