<?php
	
	$host = 'localhost';
	$user = 'u338188990_appMoviles';
	$password = 'Fafs@14051994';
	$db	  = 'u338188990_appMoviles';

	$conection = @mysqli_connect($host,$user,$password,$db);

//mysqli_close($conection);
if(!$conection){
	echo "Error al concetar";
}
?>