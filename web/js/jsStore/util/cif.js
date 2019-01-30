function cif(cif)
{
    par = 0
    non = 0
    letras="ABCDEFGHKLMNPQS"
    lete=cif.charAt(0)

    if (!isNaN(lete))
    {
        nif=cif
        validar(nif)
        return false
    }

    if (cif.length!=9)
    {
        alert('El Cif debe tener 9 dígitos')
        document.formulario.nif.focus()
        return false
    }

    if (letras.indexOf(lete.toUpperCase())==-1)
    {
        alert("El comienzo del Cif no es válido")
        document.formulario.nif.focus()
        return false
    }

    for (zz=2;zz<8;zz+=2)
    {
        par = par+parseInt(cif.charAt(zz))
    }

    for (zz=1;zz<9;zz+=2)
    {
        nn = 2*parseInt(cif.charAt(zz))
        if (nn > 9) nn = 1+(nn-10)
        non = non+nn
    }

    parcial = par + non

    control = (10 - ( parcial % 10))

    if (control==10) control=0

    if (control!=cif.charAt(8))
    {
        alert("El Cif no es válido")
        document.formulario.nif.focus()
        return false
    }
    alert("El Cif es válido")
}

function validar(abc)
{
    dni=abc.substring(0,abc.length-1)
    lete=abc.charAt(abc.length-1)
    if (!isNaN(lete))
    {
        alert('Falta la letra')
        document.formulario.nif.focus()
        return false
    }
    else
    {
        cadena="TRWAGMYFPDXBNJZSQVHLCKET"
        posicion = dni % 23
        letra = cadena.substring(posicion,posicion+1)
        if (letra!=let.toUpperCase())
        {
            alert("Nif no válido")
            document.formulario.nif.focus()
            return false
        }
    }
    alert("Nif válido")
}/* ]]> */