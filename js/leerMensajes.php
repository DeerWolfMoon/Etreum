<?php
header("Access-Control-Allow-Origin: *");

  $correoUsuario = $_REQUEST["correoUsuario"];

  require("conexion.php");

   $sql = "SELECT * FROM tblMensajes WHERE menPara  = '$correoUsuario'";
   $resultado =  mysqli_query($conexion, $sql);
   $retorno = array();
   while ($registro= mysqli_fetch_assoc($resultado)){
        $retorno[] = array("correo"=> $registro["menPara"], 
                           "mensajes" => $registro["menMensaje"], 
                           "fecha"=> $registro["menFechaHora"]);
   }
   mysqli_close($conexion);
   header('Content_type: application/json');
   echo json_encode($retorno)
?>