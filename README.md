# Use Git - OpenCode Git Workflow Skills

[![npm version](https://img.shields.io/npm/v/@changjian-k2k/use-git.svg)](https://www.npmjs.com/package/@changjian-k2k/use-git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一组通用的 Git 工作流技能，适用于各种软件开发场景（软件、固件、文档等）。

## 🚀 快速安装

### 使用 npm（推荐）

```bash
# 全局安装
npm install -g @changjian-k2k/use-git

# 或使用 npx（无需全局安装）
npx @changjian-k2k/use-git
```

### 手动安装

```bash
# 克隆仓库
git clone https://github.com/changjian-k2k/use-git.git

# 进入目录并运行安装脚本
cd use-git
npm install
```

## 📋 功能特性

| 技能名称 | 描述 | 适用场景 |
|---------|------|---------|
| **git-workflow** | Git Flow 分支管理策略 | 团队协作、特性开发、版本控制 |
| **git-master** | 高级 Git 操作专家 | 提交整理、变基操作、历史查询 |

### git-workflow 特性

- ✅ **特性分支管理** - 自动创建和管理 feature 分支
- ✅ **代码提交前检查** - LSP 诊断、构建验证
- ✅ **显式用户确认** - 不会自动合并，必须用户批准
- ✅ **测试验证工作流** - 支持自动化和手动测试
- ✅ **标准化合并流程** - Git Flow / GitHub Flow 支持

### git-master 特性

**提交模式 (Commit Mode)**
- 🤖 智能提交拆分 - 多文件自动拆分为原子提交
- 🎨 自动风格检测 - 语义化/普通/简短提交风格
- 🧪 测试文件自动配对 - 实现与测试文件同步提交
- 📝 智能提交信息生成

**变基模式 (Rebase Mode)**
- 🔀 交互式变基与提交压缩
- ✨ 自动 squash/fixup 应用
- 🔄 分支更新（rebase onto）
- 🔧 冲突解决指导

**历史搜索模式 (History Search Mode)**
- 🔍 代码追溯（git log -S/-G）
- 👤 行级归因（git blame）
- 🐛 Bug 引入定位（git bisect）
- 📁 文件历史追踪

## 📖 使用方法

安装后，在 OpenCode 中直接使用自然语言：

### Git Flow 工作流

```
用户: 帮我完成这个功能的 Git 提交

OpenCode: 我将为你创建特性分支并管理整个流程...
```

```
用户: 特性开发完成了，准备合并

OpenCode: 特性已准备就绪，等待你的确认...
[显示验证状态并提供选项]
```

### Git 大师操作

```
用户: 整理一下提交历史

OpenCode: 分析提交历史中...
[自动检测风格并提供优化建议]
```

```
用户: 查询这个改动是什么时候引入的

OpenCode: 搜索代码历史中...
[显示相关提交和作者信息]
```

## 📦 项目结构

```
use-git/
├── README.md                  # 本文件
├── package.json              # npm 包配置
├── LICENSE                   # MIT 许可证
├── bin/
│   ├── install.js           # 安装脚本
│   └── uninstall.js         # 卸载脚本
└── skills/
    ├── git-workflow.skill   # Git Flow 工作流技能
    └── git-master.skill     # Git 大师技能
```

## ⚙️ 安装详情

### npm 安装后的自动配置

当你运行 `npm install -g @changjian-k2k/use-git` 时：

1. 📥 下载技能包
2. 🔧 自动运行安装脚本
3. 📂 复制 `.skill` 文件到 `~/.opencodeskills/`
4. ✅ 显示安装摘要

### 手动触发安装

如果自动安装失败，可以手动运行：

```bash
# 使用 npx 运行安装
npx @changjian-k2k/use-git

# 或运行特定脚本
npx use-git-install
```

### 验证安装

```bash
# 检查技能是否安装成功
ls ~/.opencodeskills/*.skill

# 在 OpenCode 中验证
/skill list
```

## 🔧 卸载

```bash
# 使用 npm 卸载
npm uninstall -g @changjian-k2k/use-git

# 这将自动运行卸载脚本，移除技能文件
```

## 🌟 支持的 Git 工作流

- **Git Flow** - `feature → develop → main`
- **GitHub Flow** - `feature → main`
- **Trunk-based Development** - 主干开发
- **Forking Workflow** - Fork 工作流
- **自定义工作流** - 任何 Git 工作流程

## 📝 示例场景

### 场景 1：特性开发（软件项目）

```
用户: 我要添加用户认证功能

OpenCode:
1. 创建 feature/user-auth 分支
2. 实现代码更改
3. 运行 LSP 诊断和测试
4. 提交多个原子提交
5. 请求合并确认
```

### 场景 2：固件开发

```
用户: 实现温度控制算法

OpenCode:
1. 创建 feature/temp-control 分支
2. 编写算法实现
3. 运行编译检查
4. 请求硬件测试
5. 合并到 develop
```

### 场景 3：文档项目

```
用户: 更新 API 文档

OpenCode:
1. 创建 feature/api-docs 分支
2. 更新 Markdown 文件
3. 检查格式和链接
4. 提交并合并
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 本地测试

```bash
# 克隆仓库
git clone https://github.com/changjian-k2k/use-git.git
cd use-git

# 本地安装测试
npm link

# 验证安装
npx @changjian-k2k/use-git

# 取消链接
npm unlink
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👥 作者

- **原作者**: RT2401 团队
- **维护者**: changjian-k2k

## 🔗 相关链接

- [OpenCode](https://github.com/opencode-ai/opencode)
- [Git Flow 工作流](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)

---

**注意**: 这些技能需要配合 [OpenCode](https://github.com/opencode-ai/opencode) 使用。
