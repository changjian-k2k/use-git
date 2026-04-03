# OpenCode Git Workflow Skills

一组通用的 Git 工作流技能，适用于各种软件开发场景（软件、固件、文档等）。

## 技能列表

| 技能名称 | 描述 | 适用场景 |
|---------|------|---------|
| **git-workflow** | Git Flow 分支管理策略 | 团队协作、特性开发、版本控制 |
| **git-master** | 高级 Git 操作专家 | 提交整理、变基操作、历史查询 |

## 快速开始

### 安装

1. 克隆此仓库：
```bash
git clone https://github.com/yourusername/opencodeskills-git-workflow.git
```

2. 复制技能文件到你的 OpenCode 技能目录：
```bash
# macOS/Linux
cp *.skill ~/.opencodeskills/

# Windows
copy *.skill %USERPROFILE%\.opencodeskills\
```

3. 重启 OpenCode 或使用 `/skill reload` 命令

### 使用方法

安装后，在 OpenCode 中直接使用：

```
- "帮我完成这个功能的 Git 提交"
- "整理一下提交历史"
- "查询这个改动是什么时候引入的"
```

详见 [USAGE.md](USAGE.md) 了解完整用法。

## 技能详解

### git-workflow

实现 Git Flow 工作流的最佳实践：

- ✅ 特性分支管理
- ✅ 提交前代码检查
- ✅ 显式用户确认机制（不会自动合并）
- ✅ 测试验证工作流
- ✅ 标准化的合并流程

**工作流程：**
```
特性开发 → 代码检查 → 用户确认 → 测试验证 → 合并到 develop
```

### git-master

高级 Git 操作专家，提供三种模式：

**1. Commit Mode（提交模式）**
- 智能提交拆分（多文件 → 多个原子提交）
- 自动检测提交风格（语义化/普通/简短）
- 自动配对实现与测试文件
- 提交信息模板生成

**2. Rebase Mode（变基模式）**
- 交互式变基与提交压缩
- 自动 squash/fixup 应用
- 分支更新（rebase onto）
- 冲突解决指导

**3. History Search Mode（历史搜索模式）**
- 代码追溯（git log -S/-G）
- 行级归因（git blame）
- Bug 引入定位（git bisect）
- 文件历史追踪

## 项目结构

```
opencodeskills-git-workflow/
├── README.md                  # 本文件
├── USAGE.md                   # 详细使用指南
├── INSTALLATION.md            # 安装说明
├── LICENSE                    # MIT 许可证
├── git-workflow.skill         # Git Flow 工作流技能
└── git-master.skill           # Git 大师技能
```

## 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 作者

- **原作者**: RT2401 团队
- **维护者**: Your Name

---

**注意**: 这些技能需要配合 [OpenCode](https://github.com/your-opencode-repo) 使用。
