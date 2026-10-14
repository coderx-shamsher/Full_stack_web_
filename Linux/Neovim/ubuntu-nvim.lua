local opt = vim.opt

opt.number = true
opt.relativenumber = true

opt.expandtab = true
opt.shiftwidth = 2
opt.tabstop = 2
opt.softtabstop = 2


vim.g.loaded_perl_provider = 0
vim.g.loaded_ruby_provider = 0

-- Bootstrap lazy.nvim

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)


-- Plugins
local plugins = {
    {
      "folke/tokyonight.nvim",
      priority = 1000,
      config = function()
        vim.cmd.colorscheme("tokyonight")
      end,
  },

    {
    "nvim-telescope/telescope.nvim",
      dependencies = {
      "nvim-lua/plenary.nvim",
     },

   },

  --  {
  --   "nvim-treesitter/nvim-treesitter",
  --   build = ":TSUpdate",
  --   lazy = false,
  --   config = function()
  --      require("nvim-treesitter").install({
  --         "vim",
  --         "bash",
  --         "javascript",
  --         "typescript",
  --         "html",
  --         "css",
  --         "lua",
  --       })

  --    vim.api.nvim_create_autocmd("FileType", {
  --        pattern = {  
  --          "vim",
  --          "bash",
  --          "javascript",
  --          "typescript",
  --          "html",
  --          "css",
  --          "lua",

  --        },
  --      callback = function()
  --         vim.treesitter.start()
  --        end,
  --     })
  --     end,
  --  },
    
  -- new improve config 

  {
  "nvim-treesitter/nvim-treesitter",
  branch = "main",
  build = ":TSUpdate",
  lazy = false,
  config = function()
    local parsers = {
      "vim",
      "bash",
      "javascript",
      "typescript",
      "html",
      "css",
      "lua",
    }

    require("nvim-treesitter").install(parsers)

    vim.api.nvim_create_autocmd("FileType", {
      pattern = parsers,
      callback = function(args)
        local ok, err = pcall(vim.treesitter.start, args.buf)

        if not ok then
          vim.notify(
            "Tree-sitter could not start for " .. args.match .. ": " .. err,
            vim.log.levels.WARN
          )
        end
      end,
    })
  end,
}

}

-- options  ->> 

local opts = {
  rock = {
    enabled = false,
  }
}

-- load lazy 
require("lazy").setup(plugins,opts)


-- telescope keybind
local builtin = require("telescope.builtin")

vim.g.mapleader = " "

vim.keymap.set('n', '<C-p>', builtin.find_files, {desc = "Find Files"})


-- keybind for grep inside nvim 

vim.g.mapleader = " "

vim.keymap.set('n', '<leader>fg', builtin.live_grep, {
  desc = "Search text in files",
})


