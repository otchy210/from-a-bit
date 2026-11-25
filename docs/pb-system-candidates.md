# TBからPBへの補強調査：2U製品と単一システム

調査日：2026-11-25。[掲載一覧](site-item-selection.md)の45～49番で使う容量と年代の調査資料。

## 掲載順と容量比

HDDサーバーの616 TBとHDDストレージの2.5 PBを、πの314 TBとSSDサーバーの9.8304 PBの間に置く。432 TBのLTOは、同じ高さの2U製品として616 TBの項目の本文で紹介する。PB級の単一筐体の到達点は80.64 PBのテープライブラリー。

| 掲載順 | 代表容量 | 直前からの容量比 | 図の縦・横それぞれの倍率 |
| --- | --- | --- | --- |
| 41：πの数字列の模型 | 314 TB | — | — |
| 42：2U HDDサーバー | 616 TB | 約1.96倍 | 約1.40倍 |
| 43：4U HDDストレージ | 2,500 TB＝2.5 PB | 約4.06倍 | 約2.01倍 |
| 44：2U SSDサーバー | 9,830.4 TB＝9.8304 PB | 約3.93倍 | 約1.98倍 |
| 45：48U LTOテープライブラリー | 80,640 TB＝80.64 PB | 約8.20倍 | 約2.86倍 |

314 TBから9.8304 PBまでの約31.31倍の差を、約2倍・4倍・4倍の3段階に分ける。容量を面積に対応させるため、図の縦・横それぞれの倍率は容量比の平方根で求める。

同じ2Uで9.8304 PBを上回るHDD／LTO製品は、今回参照したメーカー資料の範囲では確認できなかった。

## 製品候補と容量の根拠

TB＝10¹² B、PB＝10¹⁵ B。以下は最大搭載構成またはメーカー公称構成であり、平均的な導入構成ではない。「一般的な製品」は既製品として選べるという意味で、販売シェアを調査した意味ではない。

| 代表ID・元ID | 製品・構成 | 年代の根拠 | 物理範囲 | 比較に使う容量 | 根拠・留意点 |
| --- | --- | --- | --- | --- | --- |
| PB01 | HPE Storage MSL2024 Gen4、LTO-9を24巻 | 2026年3月以降の製造分がGen4と公式構成図に記載。MSL2024シリーズやLTO-9自体の初登場年ではない。 | 2Uのライブラリー1筐体 | **432 TB native**＝18 TB×24巻＝432,000,000,000,000 B | [HPE日本語構成図][hpe-config]の4頁、19～21頁、27頁と[公式仕様][hpe-spec]。最大24巻をデータ用に使用する構成。クリーニングや搬入出用スロットの運用で減る。標準添付15巻のパッケージ容量とは区別する。 |
| PB02 | Dell PowerEdge R760xd2、22 TB HDDを28台 | **2023年5月のDell仕様書**で2U・616 TB構成を確認。仕様書の日付であり正確な発売日ではない。 | 2Uサーバー1台 | **616 TB raw**＝22 TB×28台＝616,000,000,000,000 B | [Dell仕様書の原URL][dell-spec]。取得時403のため、検索索引と[同じDell作成仕様書の販売店配布版][dell-mirror]で照合。前面側24台と背面側4台を使う最大構成。RAID・ファイルシステムの控除前。 |
| PB03 | Seagate Exos CORVAULT 4U106、型番R4106I2500T002 | **2023-11-14：2.5 PB構成発表**。同年12月末提供予定と記載。実出荷初日の確認ではない。 | 4Uストレージ装置1筐体。冗長コントローラー内蔵 | **公称2.5 PB raw**＝公称2,500,000,000,000,000 B | [発表][corvault-release]と[仕様書][corvault-spec]2頁。仕様書が明示するraw容量を採用。ADAPTの保護領域等を引いた利用可能容量ではない。106ベイからドライブ1台の容量を逆算しない。 |
| X01（既存） | Dell PowerEdge R7725xd＋KIOXIA LC9 E3.L、245.76 TB SSDを40台 | **2026-05-15：構成実現発表** | 2Uサーバー1台 | **9.8304 PB raw**＝245.76 TB×40台＝9,830,400,000,000,000 B | [KIOXIA発表][kioxia-2u]。40台を搭載した構成の公称容量合計。保護領域等の控除前。発表当時の「業界最大」を、無期限の世界一として表示しない。 |

HPEの見出しにある約1.1 PBは**2.5:1圧縮時**の丸めた容量で、非圧縮の432 TBを使う。432 TB×2.5＝1.08 PBとなる。同じ2U・LTO-9・432 TB nativeの別例として[Qualstar Q24][q24]も確認できる。

2Uはラック内の**高さ**の区分で、幅・奥行き・体積まで同一という意味ではない。また、テープは24巻が同時に読み書きされるわけではなく、ライブラリー内でドライブへ順次装填する。HDD／SSDの総容量と比べることはできるが、アクセス方法や性能は同じではない。

## PB04：単一筐体の80.64 PB

**Quantum Scalar i7 RAPTORのLTO-10構成、80.64 PB native**は、今回一次資料で確認できた単一筐体の最大級の例。48Uの専用キャビネット1台に最大2,016巻を収める。40 TB×2,016巻＝80,640 TB＝80.64 PBで、クラスタや複数ライブラリーの合算ではない。[Quantum公式製品ページ][raptor]がリンクする[公式データシート][scalar-spec]4頁に、非圧縮80,640 TBと最大1モジュール、拡張モジュールなしの構成が記載されている。[設置ガイド][raptor-guide]でも48U・2,016物理スロット・LTO-10対応を確認できる。

- **年代**：製品本体は2024年に一般提供開始。今回参照する40 TB LTO-10構成は2026-11-25時点の仕様。2024年の発売時から80.64 PBだったとはしない。[一般提供開始の発表][raptor-ga]も参照。
- **容量の範囲**：全スロットに40 TBデータカートリッジを配置するメーカー最大公称値。スロットのライセンス、搬入出用スロット、クリーニング用媒体等の割当で実際のデータ容量は変わる。圧縮時201.6 PBは採用しない。
- **現存の意味**：製品と対応構成がメーカー資料に存在することを確認した。80.64 PB満載で稼働中の顧客システムや、保存済みデータ量の実測を確認したものではない。
- **最大の言い方**：「単一筐体で今回確認した最大級」とする。業界横断の網羅調査や、世界最大の実稼働設備の証明はできていないため、サイトで「世界最大」と断定しない。

## 複数筐体を連結した単一ライブラリーとの区別

「単一システム」は必ずしも「1筐体」ではない。ロボットでテープを移送できる連結型ライブラリーは、複数の独立ストレージをネットワークで束ねたクラスタとは区別する必要がある。

上限の探索では、Spectra Logic **TFinity Plus**の最大45フレーム構成を確認した。[メーカー仕様][tfinity]ではLTO-10で非圧縮約2.2 EB、最大56,400巻。40 TB×56,400巻なら2,256 PBとなる。これは複数筐体からなる単一ライブラリーの構成上限。[掲載一覧のE10](site-item-selection.md#5-デジタルデータの集積からzb級へ)ではメーカー表の非圧縮2.2 EBを描画に使う。

## 本文を書くときの確認

- HPE／Dellの製品シリーズ初出年と、採用する容量構成が提供可能になった年は同一とは限らない。年表には上表の年の意味を残す。
- CORVAULTの2.5 PBは仕様書の公称raw値。丸め前の正確なアドレス可能B数は未確認であり、「正確な実容量2,500,000,000,000,000 B」とは表示しない。
- 今回の容量順案はメーカー公称値に基づく。raw、native、利用可能容量、データ模型を一律に「実際に保存できる容量」とまとめない。

## 出典

[hpe-config]: https://h50146.www5.hpe.com/directplus_ent/library/pdfs_storage/pl_tape.pdf
[hpe-spec]: https://www.hpe.com/jp/ja/product-catalog/storage/tape-automation/pip.specifications.storeever-msl-tape-libraries.1014930741.html
[dell-spec]: https://www.delltechnologies.com/asset/en-us/products/servers/technical-support/poweredge-r760xd2-spec-sheet.pdf
[dell-mirror]: https://cdn.blueally.com/sanstorageworks/datasheets/poweredge/poweredge-r760xd2-spec-sheet.pdf
[corvault-release]: https://www.seagate.com/stories/articles/seagate-takes-its-high-performing-multi-petabyte-capacity-block-storage-system-to-new-heights-reaching-2-5-pb-pr/
[corvault-spec]: https://www.seagate.com/content/dam/seagate/en/content-fragments/products/datasheets/exos-pods/corvault-self-healing-storage-DS2058-4-2309US-en_US.pdf
[kioxia-2u]: https://www.kioxia.com/ja-jp/business/news/2026/20260515-1.html
[q24]: https://www.qualstar.com/products/q24
[raptor]: https://www.quantum.com/en/products/tape-storage/scalar-i7
[scalar-spec]: https://cdn.allbound.com/iq-ab/2021/11/Scalar-Tape-DS00559A.pdf
[raptor-guide]: https://qsupport.quantum.com/kb/flare/content/Scalar_i7_RAPTOR/docCenter/Site_Planning_i7.htm
[raptor-ga]: https://d1io3yog0oux5.cloudfront.net/_1f880a8a07b7adc6058553eac190da16/quantum/news/2024-12-04_Quantum_Scalar_i7_RAPTOR_Now_209.pdf
[tfinity]: https://spectralogic.com/tfinity-libraries/
