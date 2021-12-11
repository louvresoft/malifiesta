
from rest_framework import viewsets
from rest_framework import status, pagination
from apps.cat_wms.api import serializers as srlzrs


class ProveedorViewSet(viewsets.ModelViewSet):
    serializer_class = srlzrs.ProveedorSerializer
    pagination_class = pagination.LimitOffsetPagination

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True).order_by('-id')
        else:
            return self.get_serializer().Meta.model.objects.filter(state=True, id=pk).first()

    # def list(self, request):
    #     page = self.paginate_queryset(self.get_queryset())
    #     if page is not None:
    #         proveedor_serializer = self.get_serializer(self.get_queryset(), many=True)
    #         return self.get_paginated_response(proveedor_serializer.data)
    #     else:
    #         proveedor_serializer = self.get_serializer(self.get_queryset(), many=True)
    #         return Response(proveedor_serializer.data, status=status.HTTP_200_OK)
