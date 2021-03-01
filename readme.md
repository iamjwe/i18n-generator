## example

![](D:\workspace\mians\i18n-generator\assets\i18n示例.gif)


## install 

```shell
yarn global add i18n-entozh --dev
```
## usage
### 初始化配置文件
```shell
i18n init
```
### 方式一：提取 -> 翻译 -> 生成
- 提取 -> 翻译 -> 生成（不人工校验）

```shell
i18n task -etg
```
### 方式二：提取 -> 翻译 -> 校验（人工） -> 生成
- 提取 -> 翻译（接下来可以人工校验）

```shell
i18n task -et
```

- 翻译 -> 生成（校验之后生成代码）

```
i18n task -g
```

## task

| 任务名称                               | 任务职责                                    |
| -------------------------------------- | ------------------------------------------- |
| EXTRA：提取 code ( src ) -> md         | 将代码中的英文提取到markdown文件中的表格中  |
| TRANSLATE：翻译 md                     | 将markdown文件中的表格新加一列并翻译        |
| GENERATOR：生成 md -> code ( locales ) | 将markdown文件中的表格生成到locales文件夹中 |



## cli

| 参数名 | 参数意义                                                     |
| ------ | ------------------------------------------------------------ |
| help  | 输出这张表格                                                 |
| init   | 初始化配置文件                                               |
| task -e     | 执行EXTRA提取任务                                            |
| task -t     | 执行TRANSLATE翻译任务                                        |
| task -g     | 执行GENERATOR生成任务                                        |
| task -et    | 先执行EXTRA提取，再执行TRANSLATE翻译任务                     |
| task -eg    | 先执行EXTRA提取，再执行GENERATOR生成任务                     |
| task -tg    | 先执行TRANSLATE翻译任务，再执行GENERATOR生成任务             |
| task -etg   | 先执行EXTRA提取，再执行TRANSLATE翻译任务，最后执行GENERATOR生成任务 |

