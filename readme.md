## install 

```shell
yarn global add i18n-entozh --dev
```
## usage

- 提取 -> 翻译（接下来可以人工校验）

```shell
i18n-g -et
```

- 翻译 -> 生成（校验之后生成代码）

```
i18n-g -g
```

- 提取 -> 翻译 -> 生成（不人工校验）

```shell
i18n-g -etg
```

- 查看更多使用规则

```shell
i18n-g
# or
i18n-g -help
```

## task

| 任务名称                               | 任务职责                                    |
| -------------------------------------- | ------------------------------------------- |
| EXTRA：提取 code ( src ) -> md         | 将代码中的英文提取到markdown文件中的表格中  |
| TRANSLATE：翻译 md                     | 将markdown文件中的表格新加一列并翻译        |
| GENERATOR：生成 md -> code ( locales ) | 将markdown文件中的表格生成到locales文件夹中 |



## cli

| 参数名 | 参数意义                                                     | 使用示例     |
| ------ | ------------------------------------------------------------ | ------------ |
| -help  | 输出这张表格                                                 | i18n-g -help |
| init   | 初始化配置文件                                               | i18n-g -help |
| -e     | 执行EXTRA提取任务                                            | i18n-g -e    |
| -t     | 执行TRANSLATE翻译任务                                        | i18n-g -t    |
| -g     | 执行GENERATOR生成任务                                        | i18n-g -g    |
| -et    | 先执行EXTRA提取，再执行TRANSLATE翻译任务                     | i18n-g -et   |
| -tg    | 先执行TRANSLATE翻译任务，再执行GENERATOR生成任务             | i18n-g -tg   |
| -etg   | 先执行EXTRA提取，再执行TRANSLATE翻译任务，最后执行GENERATOR生成任务 | i18n-g -etg  |

