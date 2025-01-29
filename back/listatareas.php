<?php
// Incluir configuración externa
include('conexion.php');

// Configuración de encabezados para CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

// Validar conexión a la base de datos
if (!$conection) {
    echo json_encode(array('estado' => false, 'mensaje' => 'Error de conexión a la base de datos.'));
    exit();
}

// Capturar datos JSON del cuerpo de la solicitud
//$_POST = json_decode(file_get_contents("php://input"), true);

// Validar que la acción esté definida
if (!isset($_POST['action'])) {
    echo json_encode(array('estado' => false, 'mensaje' => 'Acción no especificada1.'));
    exit();
}

// Acción: insertar tarea
if ($_POST['action'] == 'insertar') {
    if (!isset($_POST['titulo'], $_POST['descripcion'], $_POST['estado']) ||
        empty($_POST['titulo']) || empty($_POST['descripcion']) || empty($_POST['estado'])) {
        echo json_encode(array('estado' => false, 'mensaje' => 'Todos los campos son obligatorios.'));
        exit();
    }

    $titulo = mysqli_real_escape_string($conection, $_POST['titulo']);
    $descripcion = mysqli_real_escape_string($conection, $_POST['descripcion']);
    $estado = mysqli_real_escape_string($conection, $_POST['estado']);

    $sql_insert = "INSERT INTO tareas (titulo, descripcion, estado) VALUES ('$titulo', '$descripcion', '$estado')";

    if (mysqli_query($conection, $sql_insert)) {
        echo json_encode(array('estado' => true, 'mensaje' => 'Tarea insertada correctamente.'));
    } else {
        echo json_encode(array('estado' => false, 'mensaje' => 'Error al insertar la tarea: ' . mysqli_error($conection)));
    }
}

// Acción: eliminar tarea
elseif ($_POST['action'] == 'eliminar') {
    if (!isset($_POST['id']) || empty($_POST['id'])) {
        echo json_encode(array('estado' => false, 'mensaje' => 'El ID es obligatorio para eliminar.'));
        exit();
    }

    $id = mysqli_real_escape_string($conection, $_POST['id']);
    $sql_delete = "DELETE FROM tareas WHERE id = '$id'";

    if (mysqli_query($conection, $sql_delete)) {
        echo json_encode(array('estado' => true, 'mensaje' => 'Tarea eliminada correctamente.'));
    } else {
        echo json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar la tarea: ' . mysqli_error($conection)));
    }
}

// Acción: actualizar tarea
elseif ($_POST['action'] == 'actualizar') {
    if (!isset($_POST['id'], $_POST['titulo'], $_POST['descripcion'], $_POST['estado']) ||
        empty($_POST['id']) || empty($_POST['titulo']) || empty($_POST['descripcion']) || empty($_POST['estado'])) {
        echo json_encode(array('estado' => false, 'mensaje' => 'Todos los campos son obligatorios para actualizar.'));
        exit();
    }

    $id = mysqli_real_escape_string($conection, $_POST['id']);
    $titulo = mysqli_real_escape_string($conection, $_POST['titulo']);
    $descripcion = mysqli_real_escape_string($conection, $_POST['descripcion']);
    $estado = mysqli_real_escape_string($conection, $_POST['estado']);

    $sql_update = "UPDATE tareas SET titulo = '$titulo', descripcion = '$descripcion', estado = '$estado' WHERE id = '$id'";

    if (mysqli_query($conection, $sql_update)) {
        echo json_encode(array('estado' => true, 'mensaje' => 'Tarea actualizada correctamente.'));
    } else {
        echo json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar la tarea: ' . mysqli_error($conection)));
    }
}

// Acción: obtener tarea por ID
elseif ($_POST['action'] == 'tarea') {
    if (!isset($_POST['id']) || empty($_POST['id'])) {
        echo json_encode(array('estado' => false, 'mensaje' => 'El ID es obligatorio.'));
        exit();
    }

    $id = mysqli_real_escape_string($conection, $_POST['id']);
    $sql = "SELECT * FROM tareas WHERE id = '$id'";
    $query = mysqli_query($conection, $sql);

    if (mysqli_num_rows($query) > 0) {
        $row = mysqli_fetch_assoc($query);
        echo json_encode(array('estado' => true, 'tarea' => $row));
    } else {
        echo json_encode(array('estado' => false, 'mensaje' => 'No se encontró la tarea.'));
    }
}

// Acción: listar todas las tareas
elseif ($_POST['action'] == 'listar') {
    $sql = "SELECT * FROM tareas";
    $query = mysqli_query($conection, $sql);

    if (mysqli_num_rows($query) > 0) {
        $datos = [];
        while ($row = mysqli_fetch_assoc($query)) {
            $datos[] = $row;
        }
        echo json_encode(array('estado' => true, 'tareas' => $datos));
    } else {
        echo json_encode(array('estado' => false, 'mensaje' => 'No hay tareas registradas.'));
    }
} else {
    echo json_encode(array('estado' => false, 'mensaje' => 'Acción no válida.'));
    exit();
}
?>