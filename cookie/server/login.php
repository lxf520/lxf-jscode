<?php
header("Access-Control-Allow-Origin:*");
# 假设用户名 lw  密码 123456
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

if($username == "lw")
{
  if($password == "123456")
  {
    echo '{"status":"success","data":"登录成功"}';
  }else
  {
    echo '{"status":"error","data":"密码不正确"}';
  }
}else
{
  echo '{"status":"error","data":"该用户不存在!"}';
}
?>