# T03 PLACE

東京03 非公式ファンサイト

## Commit Message Rules

コミットメッセージには以下のルールで必ずプレフィックスを付与します。  
このルールは [commitlint デフォルトの type-enum](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) に沿っています。

|Prefix|Overview|
|:--:|:--|
|`build`|ビルドリソースの更新|
|`ci`|CI関連の変更|
|`docs`|ドキュメント関連の変更|
|`feat`|新しい機能実装|
|`fix`|不具合の修正|
|`perf`|パフォーマンス関連の変更|
|`refactor`|リファクタリング|
|`revert`|変更のリバート|
|`style`|コードスタイル・Lint関連の変更|
|`test`|テスト関連の変更|
|`chore`|上記以外の雑多な変更|

## Branch Operations

以下のルールでGitブランチを運用します。  
ブランチは上から下への流れでマージされていきます。

|Branch Name|Overview|Base URL|Environment|
|:--:|:--|
|`feature/**`|機能追加のブランチ|N/A|DevT03|
|`develop`|開発環境のメインブランチ|dev.t03.place|DevT03|
|`preview`|プレビュー版ブランチ|preview.t03.place|LiveT03|
|`main`|本番ブランチ|www.t03.place|LiveT03|
