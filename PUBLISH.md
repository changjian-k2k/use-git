# NPM 发布指南

本指南说明如何将 @changjian-k2k/use-git 发布到 npm，让其他人可以通过 npm/npx 安装。

## 📦 包结构

```
use-git/
├── bin/
│   ├── install.js          # 安装脚本（自动运行）
│   └── uninstall.js        # 卸载脚本
├── skills/
│   ├── git-workflow.skill  # Git Flow 技能
│   └── git-master.skill    # Git 大师技能
├── index.js                # 包入口（API + CLI）
├── package.json            # npm 配置
├── README.md               # 说明文档
├── LICENSE                 # MIT 许可证
└── .gitignore             # Git 忽略文件
```

## 🚀 发布到 NPM

### 1. 准备工作

```bash
# 1. 登录 npm（如果没有账号，先注册 https://www.npmjs.com/signup）
npm login

# 2. 验证登录
npm whoami

# 3. 确保在包目录中
cd use-git
```

### 2. 测试包

```bash
# 检查包内容
npm pack

# 这将生成一个 .tgz 文件，可以检查其内容
tar -tzf changjian-k2k-use-git-2.1.0.tgz
```

### 3. 发布到 npm

```bash
# 发布 scoped 包（必须指定 --access public）
npm publish --access public
```

### 4. 验证发布

```bash
# 查看包信息
npm view @changjian-k2k/use-git

# 测试安装
npm install -g @changjian-k2k/use-git

# 或使用 npx
npx @changjian-k2k/use-git
```

## 🔄 版本更新

### 语义化版本（Semantic Versioning）

- **Patch (1.0.x)**: Bug 修复
- **Minor (1.x.0)**: 新功能，向后兼容
- **Major (x.0.0)**: 重大变更，可能不兼容

### 更新流程

```bash
# 1. 更新版本号（自动更新 package.json）
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0

# 2. 发布新版本
npm publish --access public

# 或一步完成
npm version patch && npm publish --access public
```

### 使用 prerelease 标签

```bash
# 发布 beta 版本
npm version prerelease --preid=beta
npm publish --tag beta --access public

# 用户使用
npm install -g @changjian-k2k/use-git@beta
```

## 📋 用户使用方式

### 方式 1：全局安装（推荐）

```bash
npm install -g @changjian-k2k/use-git
```

安装时自动执行 `postinstall` 脚本，将技能复制到 `~/.opencodeskills/`。

### 方式 2：使用 npx（无需全局安装）

```bash
# 直接运行安装
npx @changjian-k2k/use-git

# 这将下载包并执行安装脚本
```

### 方式 3：本地安装

```bash
# 在项目目录中安装
npm install @changjian-k2k/use-git

# 然后运行安装脚本
npx @changjian-k2k/use-git
# 或
node node_modules/@changjian-k2k/use-git/bin/install.js
```

## 🛠️ 脚本命令

### 安装脚本

```bash
# 手动触发安装
npm run install

# 或
node bin/install.js

# 或
npx use-git-install
```

### 卸载脚本

```bash
# 手动触发卸载
npm run uninstall

# 或
node bin/uninstall.js
```

## ⚠️ 常见问题

### 1. 403 Forbidden - You cannot publish over the previously published versions

版本号已存在，需要更新版本号后重新发布：

```bash
npm version patch
npm publish --access public
```

### 2. 403 Forbidden - You do not have permission to publish

scoped 包需要 `--access public` 参数，或者你的 npm 账号没有发布权限。

### 3. 安装时没有自动复制技能

检查：

1. `package.json` 中的 `scripts.postinstall` 是否正确设置
2. 安装时是否有错误信息
3. 手动运行 `node bin/install.js` 测试

### 4. 权限问题

```bash
# 如果安装到全局需要 sudo（不推荐）
# 更好的方法是更改 npm 全局目录
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### 5. 更新包

```bash
# 更新到最新版本
npm update -g @changjian-k2k/use-git

# 或重新安装
npm uninstall -g @changjian-k2k/use-git
npm install -g @changjian-k2k/use-git
```

## 📊 发布检查清单

- [ ] `package.json` 中 `name` 为 `@changjian-k2k/use-git`
- [ ] `version` 已更新
- [ ] `publishConfig.access` 设置为 `public`
- [ ] `files` 数组包含所有必要文件
- [ ] `keywords` 包含相关关键词
- [ ] `author` 和 `license` 已设置
- [ ] README.md 包含安装和使用说明
- [ ] 所有 skill 文件已包含在 skills/ 目录
- [ ] 安装脚本测试通过
- [ ] `npm pack` 检查包内容正确
- [ ] 已登录 npm (`npm whoami`)
- [ ] 发布成功并能正常安装测试

## 🎯 最佳实践

1. **使用 CI/CD 自动发布**
   ```yaml
   # .github/workflows/publish.yml
   name: Publish to NPM
   on:
     push:
       tags:
         - 'v*'
   jobs:
     publish:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '16'
             registry-url: 'https://registry.npmjs.org'
         - run: npm ci
         - run: npm publish --access public
           env:
             NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

2. **维护 CHANGELOG.md**
   记录每个版本的变更，便于用户了解更新内容。

3. **使用 Git 标签**
   ```bash
   git tag -a v2.1.0 -m "Release version 2.1.0"
   git push origin v2.1.0
   ```

4. **测试不同环境**
   - macOS
   - Linux
   - Windows (PowerShell & CMD)

## 📞 获取帮助

- [npm 文档](https://docs.npmjs.com/)
- [发布包指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Scoped 包发布](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [语义化版本](https://semver.org/lang/zh-CN/)

---

**发布成功后，用户可以通过以下方式安装：**

```bash
# 全局安装
npm install -g @changjian-k2k/use-git

# 或使用 npx 查看信息
npx @changjian-k2k/use-git
```
