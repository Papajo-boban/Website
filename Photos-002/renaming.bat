@echo off
setlocal EnableDelayedExpansion

set count=1
for %%f in (*.jpg) do (
  echo %%f | findstr /C:"-small.jpg" > nul
  if !errorlevel! neq 0 (
    ren "%%f" "image!count!.jpg"
    set /a count+=1
  )
)

set smallCount=1
for %%f in (*-small.jpg) do (
  ren "%%f" "image!smallCount!-small.jpg"
  set /a smallCount+=1
)

endlocal
