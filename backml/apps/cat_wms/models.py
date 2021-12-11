from apps.user.models import User
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.validators import MinLengthValidator

from apps.base.models import BaseModel


class Ubicaciones(BaseModel):
    ubicacion = models.CharField(max_length=5, unique=True)

    def __str__(self):
        return self.ubicacion

    class Meta:
        db_table = 'cat_ubicaciones'


CHOICES_ESTATUS = (
    ("ALTA", "ALTA"),
    ("BAJA", "BAJA")
)


class Perfil(BaseModel):
    CLIENTE = 1
    ADMINISTRADOR = 2
    PERSONAL1 = 3
    PERSONAL2 = 4
    USUARIOS_CHOICES = (
        (CLIENTE, 'Cliente'),
        (ADMINISTRADOR, 'Administrador'),
        (PERSONAL1, 'Personal'),
        (PERSONAL2, 'Personal 2')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    tipo_usuario = models.PositiveSmallIntegerField(choices=USUARIOS_CHOICES, default=1)
    rfc = models.CharField(max_length=20, blank=True, null=True)
    contacto1 = models.CharField(max_length=100, blank=True, null=True)
    contacto2 = models.CharField(max_length=100, blank=True, null=True)
    telefono1 = models.CharField(max_length=20, blank=True, null=True)
    telefono2 = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=20, blank=True, null=True)
    estatus = models.CharField(max_length=40, choices=CHOICES_ESTATUS, default="ALTA")

    def __str__(self):
        return self.user.username

    class Meta:
        db_table = 'cat_perfil'

    @receiver(post_save, sender=User)
    def create_or_update_user_profile(sender, instance, created, **kwargs):
        if created:
            Perfil.objects.create(user=instance)
        instance.perfil.save()


class Sociedad(BaseModel):
    sociedad = models.CharField(max_length=250)
    nomenglatura = models.CharField("Nomenclatura", max_length=10)

    def __str__(self):
        return self.nomenglatura

    class Meta:
        db_table = 'cat_sociedad'


class Centro(BaseModel):
    centro = models.CharField(max_length=100)
    nomenglatura = models.CharField("Nomenclatura", max_length=10)
    descripcion = models.TextField(blank=True, null=True)
    sociedad = models.ForeignKey(Sociedad, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.nomenglatura

    class Meta:
        db_table = 'cat_centro'


class Almacenes(BaseModel):
    almacen = models.CharField(max_length=100)
    nomenglatura = models.CharField(max_length=10)
    centro = models.ForeignKey(Centro, on_delete=models.CASCADE)

    def __str__(self):
        return self.nomenglatura

    class Meta:
        db_table = 'cat_almacenes'


class Categoria(BaseModel):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'cat_categorias'


class Clientes(BaseModel):
    nombre = models.CharField(max_length=50)
    rfc = models.CharField(max_length=20, blank=True, null=True)
    contacto1 = models.CharField(max_length=100, blank=True, null=True)
    contacto2 = models.CharField(max_length=100, blank=True, null=True)
    telefono1 = models.CharField(max_length=20, blank=True, null=True)
    telefono2 = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=20, blank=True, null=True)
    estatus = models.CharField(max_length=40, choices=CHOICES_ESTATUS, default="ALTA")

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'cat_clientes'


class Proveedor(BaseModel):
    nombre = models.CharField(max_length=200)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    telefono2 = models.CharField(max_length=15, blank=True, null=True)
    direccion = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'cat_provedores'


CAPACIDAD_CHOICES = (
    ('1.5 TON', '1.5 TON'),
    ('3.5 TON', '3.5 TON'),
    ('8.0 TON', '8.0 TON'),
)


class Flotilla(BaseModel):
    marca = models.CharField(max_length=50, blank=True, null=True)
    modelo = models.CharField(max_length=50, blank=True, null=True)
    placas = models.CharField(max_length=6, blank=True, null=True)
    capacidad = models.CharField(max_length=50, blank=True, null=True, choices=CAPACIDAD_CHOICES)
    operador = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.marca

    class Meta:
        db_table = 'cat_flotilla'


PRODUCTOS_ESTATUS = (
    ('LIBERADO', 'LIBERADO'),
    ('MANTENIMIENDO', 'MANTENIMIENTO'),
    ('BAJA', 'BAJA')
)


class Producto(BaseModel):
    nombre = models.CharField("Clave", max_length=50, unique=True)
    descripcion = models.CharField(max_length=250, blank=True, null=True)
    fecha_alta = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=7, validators=[MinLengthValidator(7)])
    modelo = models.CharField(max_length=50, blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    precio_compra = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    ganancia = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    precio_renta = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    precio_renta_mayoreo = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    reposicion = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    departamento = models.CharField(max_length=50, blank=True, null=True)
    imagen_frontal = models.ImageField(upload_to='img_producto', blank=True, null=True)
    imagen_lateral = models.ImageField(upload_to='img_producto', blank=True, null=True)
    imagen_posterior = models.ImageField(upload_to='img_producto', blank=True, null=True)
    codigo_barras = models.CharField(max_length=50, blank=True, null=True)
    alto = models.IntegerField(blank=True, null=True)
    largo = models.IntegerField(blank=True, null=True)
    ancho = models.IntegerField(blank=True, null=True)
    volumen_cm3 = models.IntegerField(blank=True, null=True)
    peso_g = models.IntegerField(blank=True, null=True)
    pais_origen = models.CharField(max_length=50, blank=True, null=True)
    piezas_caja = models.IntegerField(blank=True, null=True)
    piezas_tarima = models.IntegerField(blank=True, null=True)
    clasificacion = models.CharField(max_length=50, blank=True, null=True)
    observacion = models.CharField(max_length=120, blank=True, null=True)
    es_kit = models.BooleanField(default=False)
    maximo = models.IntegerField(blank=True, null=True)
    minimo = models.IntegerField(blank=True, null=True)
    estatus = models.CharField(max_length=20, choices=PRODUCTOS_ESTATUS)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'cat_producto'

# class KitProducto(BaseModel):
#     producto_padre = models.ForeignKey(Producto, models.CASCADE, related_name="producto_padre")
#     producto = models.ForeignKey(Producto, models.CASCADE, related_name="producto_hijo")
#     cantidad = models.IntegerField()

