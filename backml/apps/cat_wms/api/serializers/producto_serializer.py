from rest_framework import serializers
from apps.cat_wms.models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        exclude = ('state', 'created_date', 'modified_date', 'deleted_date')
