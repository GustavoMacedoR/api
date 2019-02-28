

export const formatTelefone = (telefone)=>{

    var t = telefone.replace(/[^0-9]/g,"")+"";
    if (t.length != 11)
        return "(00) 00000-0000"
    


    return "("+t.substring(0,2)+") "+t.substring(2,7)+"-"+t.substring(7,11)

}