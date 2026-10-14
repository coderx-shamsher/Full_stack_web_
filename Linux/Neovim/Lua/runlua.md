## first install lua 


```sh 

sudo apt install lua5.5  ## check your latest version 


```

- ## run 

```sh 

lua filename.lua

```

Alternative: Make the Script Executable (macOS/Linux)

- If you want to run the file directly like a standard program (e.g., ./filename.lua) without typing lua every time, follow these steps:

1. Open your .lua file and add this shebang line at the very top:

```lua

#!/usr/bin/env lua

```

2. In your terminal, grant the file executable permissions

```bash
chmod +x filename.lua
```

3. Run it directly

```bash
./filename.lua
```
