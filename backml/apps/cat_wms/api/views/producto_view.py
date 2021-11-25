
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from apps.cat_wms.api import serializers as srlzrs


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = srlzrs.ProductoSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        else:
            return self.get_serializer().Meta.model.objects.filter(state=True, id=pk).first()

    def list(self, request):
        product_serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(product_serializer.data, status=status.HTTP_200_OK)