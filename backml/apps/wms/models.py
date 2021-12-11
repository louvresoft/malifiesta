from apps.cat_wms.models import Centro, Proveedor, Producto, Almacenes, Perfil
from apps.user.models import User
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver


class Entrada(models.Model):
    centro = models.ForeignKey(Centro, on_delete=models.CASCADE)
    fecha_entrada = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    transporte = models.CharField(max_length=50, blank=True, null=True)
    operador = models.CharField(max_length=50)
    capacidad = models.CharField(max_length=30)
    placas = models.CharField(max_length=10, blank=True, null=True)
    preveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    datos_adjuntos = models.CharField(max_length=50, blank=True, null=True)  # ADJUNTA DOCUMENTOS
    observacion = models.CharField(max_length=250, blank=True, null=True)
    estatus = models.CharField(max_length=20, blank=True, null=True)
    f_arribo = models.DateTimeField("Fecha Arribo", blank=True, null=True)
    f_descarga = models.DateTimeField('Fecha Descarga', blank=True, null=True)

    # sociedad = models.ForeignKey(Centro, on_delete=models.CASCADE)

    def __str__(self):
        return '{0}'.format(self.id)


@receiver(pre_save, sender=Entrada)
def pre_save_user(sender, instance, **kwargs):
    if not instance._state.adding:
        print('this is an update')
    else:
        print('this is an insert')


class DetalleEntrada(models.Model):
    entrada = models.ForeignKey(Entrada, on_delete=models.CASCADE, blank=True, null=True)
    fecha_entrada = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, blank=True, null=True)
    lote = models.CharField(max_length=20, blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    unidad = models.CharField(max_length=10, blank=True, null=True)
    ubicacion = models.CharField(max_length=20, blank=True, null=True)
    referencia = models.CharField(max_length=30, blank=True, null=True)
    precio_compra = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    impresion_etiqueta = models.CharField(max_length=10, blank=True, null=True)  # CAMPO BOLEANO SE IMPREME O NO
    estatus = models.CharField(max_length=30, blank=True, null=True, default='ALTA')
    estatus_entrada = models.CharField(max_length=30, blank=True, null=True)
    centro = models.ForeignKey(Centro, on_delete=models.CASCADE, blank=True, null=True)
    almacen = models.ForeignKey(Almacenes, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


@receiver(pre_save, sender=DetalleEntrada)
def pre_save_user(sender, instance, **kwargs):
    if not instance._state.adding:
        print('this is an update')
    else:
        print('this is an insert')


class Inventario(models.Model):
    detalle_entrada = models.ForeignKey(DetalleEntrada, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField(auto_now_add=True)
    usuario = models.CharField(max_length=50, blank=True, null=True)
    codigo = models.CharField(max_length=20, blank=True, null=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, blank=True, null=True)
    lote = models.CharField(max_length=20, blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    unidad = models.CharField(max_length=30, blank=True, null=True)
    ubicacion = models.CharField(max_length=20, blank=True, null=True)
    categoria = models.CharField(max_length=30, blank=True, null=True)
    referencia = models.CharField(max_length=100, blank=True, null=True)
    estatus = models.CharField(max_length=20, blank=True, null=True)
    centro = models.ForeignKey(Centro, on_delete=models.CASCADE, blank=True, null=True)
    almacen = models.ForeignKey(Almacenes, on_delete=models.CASCADE)
    flag_surtiendo = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.id


class Pedidos(models.Model):
    fecha = models.DateField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_instalacion = models.DateField("F. Instalación", blank=True, null=True)
    hora_instacion = models.TimeField(blank=True, null=True)
    evento_fecha = models.DateField(blank=True, null=True)
    evento_hora = models.TimeField(blank=True, null=True)
    recoleccion_fecha = models.DateField(blank=True, null=True)
    recoleccion_hora = models.TimeField(blank=True, null=True)
    estatus = models.CharField(max_length=50, default="PRESUPUESTO")
    cliente = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name="clientes")
    lugar_entrega = models.TextField(blank=True, null=True)
    tipo_pedido = models.CharField(max_length=10, blank=True, null=True)
    anticipo = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    docfactura = models.FileField(upload_to='facpedido', blank=True, null=True)
    docdocumento = models.FileField(upload_to='dicpedido', blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    lat = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    long = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    iva = models.BooleanField(default=False)
    surt_completado = models.BooleanField(default=False)
    observaciones = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-pk']

    def __str__(self):
        return self.id


class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedidos, on_delete=models.CASCADE, blank=True, null=True, related_name='pedido')
    articulo = models.ForeignKey(Producto, on_delete=models.CASCADE, blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    observacion = models.CharField(max_length=250, blank=True, null=True)
    cantidad_perdida = models.IntegerField(blank=True, null=True)
    subtotal = models.FloatField(default=0)
    recolectado = models.BooleanField(default=False)
    cantidadrecuperada = models.SmallIntegerField(blank=True, null=True)
    cantidadno_recuperada = models.SmallIntegerField(blank=True, null=True)
    monto_acobrar = models.SmallIntegerField(blank=True, null=True)
    reposicion_u = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    codigo = models.CharField(max_length=7, blank=True, null=True)

    def __str__(self):
        return self.articulo

    def total_linea(self):
        return self.articulo.precio_renta * self.cantidad

    def reposicion(self):
        return self.articulo.reposicion

    def cod(self):
        return self.articulo.codigo

    def recoleccion(self):
        if self.cantidadrecuperada != None:
            if self.cantidad > self.cantidadrecuperada:
                print("hacemos resta")
                resta = self.cantidad - self.cantidadrecuperada
                print(resta)
                a = self.cantidadno_recuperada = resta
                return a

    # def montoacobrar(self):
    # if self.cantidadrecuperada != None:
    # cantnorecuperada = self.cantidadno_recuperada
    # if cantnorecuperada  > 0:
    # total =  self.cantidadno_recuperada * self.articulo.reposicion
    # return total

    def save(self, **kwargs):
        self.reposicion_u = self.reposicion()
        self.subtotal = float(float(int(self.cantidad)) * float(self.articulo.precio_renta))
        self.cantidadno_recuperada = self.recoleccion()
        self.codigo = self.cod()
        # self.monto_acobrar = self.montoacobrar()
        super(DetallePedido, self).save()