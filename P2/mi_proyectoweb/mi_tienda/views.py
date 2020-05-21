from django.shortcuts import render

# Create your views here.
# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from mi_tienda.models import ClaseA, ClaseGLE,  ClaseAMG , Pedido

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def paginaprincipal(request):
    return render(request, 'paginaprincipal.html')

def amg(request):
    return render(request, 'amg.html')
def producto1(request):
    productos = ClaseA.objects.all()
    return render(request, 'producto1.html')

def producto2(request):
    return render(request, 'producto2.html')

def producto3(request):
    return render(request, 'producto3.html')

def list(request):
    Clasea = ClaseA.objects.all()
    Clasegle = ClaseGLE.objects.all()
    Claseamg = ClaseAMG.objects.all()
    html = "<h2>Listado de articulos</h2>"
    for prod in Clasea:
        print(prod.nombre)
        html += '<p>'+ prod.nombre + '  Precio:' + str(prod.precio) + '  Stock:' + str(prod.stock) + '  Motor:' + prod.motor + '  Combustible:' + prod.combustible + '<p>'
    for prod in Clasegle:
        print(prod.nombre)
        html += '<p>'+ prod.nombre + '  Precio:' + str(prod.precio) + '  Stock:' + str(prod.stock)+ '  Motor:' + prod.motor + '  Combustible:' + prod.combustible + '<p>'
    for prod in Claseamg:
        print(prod.nombre)
        html += '<p>'+ prod.nombre + '  Precio:' + str(prod.precio) + '  Stock:' + str(prod.stock) + '  Motor:' + prod.motor + '  Combustible:' + prod.combustible + '<p>'
    return HttpResponse(html)

def formulario(request):
    return render(request, 'formulario.html', {})

def recepcion(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    telefono = request.POST['telefono']
    e_mail= request.POST['e_mail']
    producto =  request.POST['producto']

    base_datos = Pedido(nombre=persona, telefono = telefono , e_mail= e_mail , articulo = producto)
    base_datos.save()
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    print(f" PEDIDO RECIBIDO!!! ----> {telefono}")
    print(f" PEDIDO RECIBIDO!!! ----> {e_mail}")
    print(f" PEDIDO RECIBIDO!!! ----> {producto}")

    return render(request, 'pedido.html', {'persona':persona, 'telefono':telefono, 'e_mail':e_mail, 'producto':producto})
