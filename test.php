<?php
	if (!isset($_GET["action"])||($_GET["action"])==""){
		die("no action");
	}else{
		$action = $_GET["action"];
	}

	if (!isset($_GET["num"])||($_GET["num"]=="")){
		die("no num");
	}else{
		$num = $_GET["num"];
	}

	if ($num == "1"){
		$led = 7;
	}else if($num == "2"){
		$led = 3;
	}

	$sock = fsockopen("192.168.1.37", 9090);
	//echo $led.$action."<Br>\r\n";

	if($action == "turnOn"){
		fwrite($sock,"o".chr($led));
	}else if($action=="turnOff"){
		fwrite($sock,"f".chr($led));
	}else if($action=="getState"){
		fwrite($sock,"c".chr($led));
		echo fgets($sock,128);
	}else{
		//die(json_encode(array("error"=>"unknonw command")));
	}

	fclose($sock);
?>
