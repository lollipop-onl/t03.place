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

## Branches and Environments

ブランチと環境は次のような関係を持ちます。  
開発にあたってブランチはテーブルの上の列から下の列に向かってマージされていくようなフローになります。

|Branch Name|Overview|Base URL|Environment|
|:--:|:--|:--:|:--:|
|`feature/**`|機能追加のブランチ|N/A|DevT03|
|`develop`|開発環境のメインブランチ|[dev.t03.place](https://dev.t03.place)|DevT03|
|`preview`|プレビュー版ブランチ|[preview.t03.place](https://preview.t03.place)|LiveT03|
|`main`|本番ブランチ|[www.t03.place](https://www.t03.place)|LiveT03|

## Firebase Environments

Firebase の各サービスは次のように環境を分けています。

|Service|Overview|DevT03|LiveT03|
|:--:|:--|:--:|:--:|
|Firestore|トップレベルのドキュメントを分ける|`/env/DevT03`|`/env/LiveT03`|
|Hosting|ドメインを分ける|[dev.t03.place](https://dev.t03.place)|[www.t03.place](https://www.t03.place)|
|Storage|トップレベルのディレクトリを分ける|`/env/DevT03`|`/env/LiveT03`|
|Authentication|環境を分けない|-|○|
|Analytics|LiveT03でのみ使用|☓|○|
