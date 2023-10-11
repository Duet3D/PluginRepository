; verify parameters
if !exists(param.S)
  abort "Missing S parameter (nozzle diameter)"

; check nozzle diameter
if global.nozzleDiameter != param.S
  abort "Incorrect nozzle diameter! Expected " ^ param.S ^ " but " ^ global.nozzleDiameter ^ " is configured."
