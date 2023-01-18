; create the nozzle diameter variable and define the last selected tool
global nozzleDiameter = 0.4
global revoExtruder = param.D
global revoHeater = param.H
global revoFan = param.F
M98 P"revo/restore-tool.g"
