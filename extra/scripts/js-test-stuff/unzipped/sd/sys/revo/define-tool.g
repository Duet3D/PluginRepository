; verify parameters
if !exists(param.S)
  abort "Missing S parameter (nozzle diameter)"

; recreate T0
if mod(param.S, 0.1) == 0
  M563 P0 D{global.revoExtruder} H{global.revoHeater} F{global.revoFan} S{"Revo Nozzle " ^ floor(param.S) ^ "." ^ floor(mod(param.S * 10, 10)) ^ "mm"}
else
  M563 P0 D{global.revoExtruder} H{global.revoHeater} F{global.revoFan} S{"Revo Nozzle " ^ floor(param.S) ^ "." ^ floor(mod(param.S, 1) * 100) ^ "mm"}
G10 P0 X0 Y0 Z0
M568 P0 R0 S0

; update the nozzle diameter
set global.nozzleDiameter = param.S

; make this configuration persistent unless it's being restored on start (R parameter)
if !exists(param.R)
  echo >"revo/restore-tool.g" "M98 P""revo/define-tool.g"" S" ^ param.S ^ " R1"
