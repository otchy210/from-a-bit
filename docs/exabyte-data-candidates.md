# PB級の先に追加するデジタルデータ候補

調査日 2026-11-25。80.64 PBのテープライブラリーから先に置ける候補を集めた。数字はデジタル媒体・データに限る。容量は十進の PB（10¹⁵ B）、EB（10¹⁸ B）、ZB（10²¹ B）を使い、二進単位は PiB・TiB と記す。

採用した10項目は[掲載一覧の50～59番](site-item-selection.md#5-デジタルデータの集積からzb級へ)を参照。

## 掲載候補

日量・年量はその期間内の合計を1つの図で表す候補。「保存量」「設備容量」「通信量」「出荷容量」「生成・複製量」は表記でも区別する。下限が示されている行は下限の位置に並べた。AWSのように桁だけが公表された例は表の後に記載する。

| ID | 候補 | 数字・基準時点 | 何を数えたか | 根拠 |
| --- | --- | --- | --- | --- |
| E01 | Google検索の索引 | **100 PBを大きく超える**。算定時点は資料に記載なし。2026-11-25確認 | 数千億のWebページなどを検索するための索引。100,000,000 GBを十進で換算した下限。元のWebページ本体やGoogle全社の保存量とは範囲が異なる。 | [Google Search公式解説][google-index] |
| E02 | NASAの地球観測データ | **128.56 PB**。2024会計年度末（2024-09-30） | NASAの地球科学データ保管量。クラウド分66.69 PBを含む合計。気候・海洋・大気などを調べる観測データ。 | [NASA Earthdata 公式技術資料、p. 5][nasa-earth] |
| E03 | NASAが利用者へ配信した地球観測データ1年分 | **約165 PB／366日**。2024会計年度 | E02と同じ資料の利用者向け配信量は平均450.8 TB/日。2023-10-01〜2024-09-30の366日を掛けた換算。利用者が同じファイルを何度も取得した場合も配信量に含まれうる。 | [NASA Earthdata 公式技術資料、p. 5][nasa-earth] |
| E04 | Internet Archiveのデジタルコレクション | **210 PB超**。2025年の実績を2026年3月に報告 | 運用責任者による、Webアーカイブや電子書籍、映像、音声などを含むユニークデータ量。ベイエリアのデータセンターにある400 PB超の物理容量とは区別する。同じ資料では2025年の取り込み量を平均123 TB/日と報告。 | [Internet Archiveの運用報告、米国議会図書館主催会合][ia-storage] |
| E05 | 日本の固定回線でダウンロードされたデータ1日分 | **約518 PB／平均1日**。2026年5月 | 総務省推計の平均48.0 Tbit/sを、48.0 × 10¹² ÷ 8 × 86,400 Bに換算。家庭向け固定系ブロードバンド契約者が対象で、一部法人を含む。下り方向のみ。 | [総務省の2026年5月調査][mic-2026]・[発表本文の再掲][mic-2026-reprint] |
| E06 | スーパーコンピューターFrontierの作業用ストレージ | **679 PB**。2022年の技術資料、利用者ガイドでも確認 | Oak Ridge National Laboratoryの並列ファイルシステムOrionで利用できる領域。計算のための作業領域で、保存済みデータ量や機器の生容量とは異なる。 | [OLCF利用者ガイド][frontier]・[2022年の運用資料][frontier-2022] |
| E07 | SKA電波望遠鏡の観測データ1年分 | **700 PB超／年**。完成稼働時の計画 | オーストラリアと南アフリカの望遠鏡の信号を計算処理した後、アーカイブへ保存する見込みの量。受信した生の信号量や現時点の保管量とは区別する。 | [SKA Observatory公式解説][ska-data]・[2021年の建設発表][ska-build] |
| E08 | CERNが保存したLHC実験データ | **1 EB**。2025-12-17発表 | 検出器の読み出しから選別し、CERNが15年以上かけて保存した実験データ。大半を磁気テープに保存。80.64 PBのテープライブラリーと比べて約12.4倍の容量。 | [CERN公式発表][cern] |
| E09 | 欧州中期予報センターの気象アーカイブ | **約1.3 EB**。2025年6月末 | ECMWFの保存データ。2024年にイタリア・ボローニャのテープ保管システムが単一の名前空間で1 EBに到達し、2025年6月末に1,300 PBとなった。CERNと近い容量で、実データを保管するテープの別事例にできる。 | [ECMWF技術史、図8][ecmwf-history]・[2024年年次報告、p. 4][ecmwf-annual] |
| E10 | 45フレームのテープライブラリー | **約2.2 EB（構成上限）**。2026-11-25仕様確認 | Spectra Logic TFinity PlusのLTO-10構成。56,400巻 × 40 TBなら2.256 EB。メーカー表の記載は非圧縮2.2 EB。80.64 PBのテープライブラリーと同じテープ技術で、複数筐体を連結した場合の上限を比べられる。 | [Spectra Logicの製品仕様][spectra]・[LTO-10の40 TB仕様][lto-40] |
| E11 | Google Colossusのファイルシステム1つ | **10 EB超**。2025-03-26発表 | Googleの分散ストレージ基盤。Googleは1クラスタに1ファイルシステムを構成し、10 EBを超えるものが2つあると公表。図に載せるなら1つの下限。Google全体やYouTube単体の保存量とは区別する。 | [Google Cloudの設計解説][colossus] |
| E12 | 日本の固定回線でダウンロードされたデータ1か月分 | **約16 EB／31日**。2026年5月 | E05と同じ48.0 Tbit/sから、平均1日518.4 PB × 31日＝16.0704 EB。実際の対象月を用いた換算。採用時はE05とどちらかを選べる。 | [総務省の2026年5月調査][mic-2026]・[発表本文の再掲][mic-2026-reprint] |
| E13 | 世界の固定・モバイル回線の通信量1日分 | **約25 EB／平均1日**。2026年推計 | E17の年間推計9.2 ZB ÷ 365日＝約25.2 EB。世界の利用者向けインターネット通信の平均日量に換算したもの。特定日の実測値とは区別する。 | [ITU *Facts and Figures 2026*][itu-traffic]・[推計方法][itu-method] |
| E14 | 2007年に世界のデジタル媒体が扱えた情報量 | **276 EB**。2007年の推計、2011年発表 | HilbertとLópezが2007年当時の圧縮技術で正規化したデジタル媒体分。論文は対応する物理的なデジタル媒体の容量を363 EBと記載。アナログ分を含む295 EBは候補値から外す。 | [Hilbert & López、*Science*][hilbert-doi]・[論文本文のStorage節][hilbert-full] |
| E15 | Seagateが1会計年度に出荷したHDD | **789 EB／1会計年度**。2026会計年度（2026-07-03終了） | 出荷したHDDの公称容量の合計。2025会計年度は595 EB。同社の出荷規模を示す数字で、設置済み容量や記録済みデータ量とは異なる。 | [SeagateのSEC提出資料、Exabytes shipped][seagate-fy26] |
| E16 | Seagateが出荷したストレージの累計 | **4 ZB超**。2025-07-29の発表時点 | Seagateの公表する創業以来の累計出荷容量、40億 TB超。E15とは期間が違う同じ会社の例。現在稼働中の機器の合計とは区別する。 | [Seagateの2025会計年度決算発表][seagate-fy25] |
| E17 | 世界の固定・モバイル回線の通信量1年分 | **約9.2 ZB／年**。2026年推計 | ITUの世界推計は固定7.5 ZB、モバイル1.7 ZB。その公表値を足した概算。オープンなインターネットを対象とし、固定回線のWi-Fiを使うスマホは固定側に含む。閉じた専用サービスやIPTVは集計範囲外。 | [ITU *Facts and Figures 2026*][itu-traffic]・[推計方法][itu-method] |
| E18 | 世界に設置されたデジタルストレージ | **約13 ZB**。2026年のIDC推計 | IDCのGlobal StorageSphere。稼働する記憶媒体の設備容量を、出荷と退役の推計から求める。空き領域も含むため、機器の総容量を比べる候補。 | [IDCの2026年解説][idc-2026]・[指標の定義][idc-definitions] |
| E19 | 世界で1年に生成・取得・複製・消費されたデータ | **約218 ZB／年**。2025年を2026年6月版で推計 | IDC Global DataSphereの218,433 EBを換算。同じデータの配信・コピーや短時間で消えるデータも計上する。日平均では約598 EB。資料の改訂で値が変わるため、対象年と推計の版を併記する。 | [IDCの指標定義と2026年6月推計][idc-definitions] |

### Amazon S3の保存データ

**AWSの2026-11-18発表には「数百EBのデータ」と「700兆個超のオブジェクト」の両方がある。** S3サービス全体の公表値であり、単一データセンターの量ではない。2026年3月の20周年記事でも容量は数百EB、件数は500兆個超。参照した一次資料では、総量の細かい値や、複製・冗長化領域を含む物理ディスクの使用量は確認できなかった。件数から平均サイズを仮定した換算は採用しない。掲載するなら「数百EB」と表示し、単一面積を使う場合は代表値の置き方を決める。数字を確定しやすいクラウドの例には、10 EB超という下限が明記されたColossusがある。[AWS Storage Blog、2026年11月][s3-nov]・[AWS News Blog、2026年3月][s3-mar]

## 2025年末のWeb全体に近い比較

2025年末の全Webページを対象とし、総バイト数まで求めた信頼できる資料は今回確認できなかった。対象を公開ページ、検索索引、クローラーが保存した応答、またはブラウザーが表示までに受信する画像などのどこまでにするかで結果が変わる。URLの別名や動的ページ、認証が必要な範囲、複数ページで共有される画像などの数え方も揃える必要がある。以下は別々の量として比較できる。

| 候補 | 数字・基準時点 | 対象と使いどころ | 根拠 |
| --- | --- | --- | --- |
| 2025年12月に収集したWebページ | **364 TiB（約400 TB）**。2025年12月、21.6億ページ分 | Common Crawlの単回の収集データの非圧縮量。年末に近い観測例。既存の314 TBの円周率に近く、終盤よりもその周辺の補強候補。 | [Common Crawlの2025年12月版][cc-dec] |
| Common Crawlの累積収集データ | **10 PiB超（約11.3 PB超）**。2026-11-25確認 | 2008年以降の複数時点の収集を含む。公式概要の容量欄の二進単位を使用。Webの年末スナップショットやユニークページの合計とは範囲が異なる。 | [Common Crawl公式概要][cc-about] |
| Wayback Machineの保存記録 | **1兆件のページ保存**。2025年10月 | 同じURLの異なる時点の保存も含む。Internet Archiveは運用資料で日次約8億件の取得も報告。WEBだけのバイト量をこの件数から換算せず、バイト軸ではE04のコレクションを使う候補。 | [Internet Archiveの公式発表][ia-trillion]・[運用報告][ia-storage] |
| 検索エンジンが索引化したWebのテキスト | **約1.8 PB**。2024年の論文の入力推計から換算 | VillalobosらがGoogle索引を代理指標として推定した約2,500億ページ × Common Crawl由来の平均約7,000 B。約1.75 PBは2つの点推定の積で、論文が求めたバイト総量の信頼区間ではない。ページ数だけでも95%区間は1,000億〜1兆2,000億ページ。画像や動画は対象外。 | [Villalobosら、ICML 2024、§2.2.1と付録B][villalobos] |
| 典型的なWebページを1回開くときのデータ量 | **約2.9 MB（デスクトップ）、約2.6 MB（モバイル）**。2025年7月 | HTTP Archiveのトップページの中央値。画像等を含む転送量。検索索引の推定ページ数に掛けると、トップページ偏重、共有資産の重複、平均と中央値の違いが入り込むため、全Web容量には外挿しない。 | [HTTP Archiveの集計][web-performance]・[収集方法][web-method] |

YouTubeも「毎分500時間超の動画アップロード」や「累計200億本超」を公式に示している。公開した数値は再生時間・本数で、元動画のビットレート分布や配信用の複数形式の総量が分からない。データ量の候補としては、条件を置いた動画容量モデルを別途作る場合に限る。[YouTubeの技術記事][youtube-engineering]・[2025年の公式発表][youtube-count]

## 掲載するときの組み合わせ案

- まず実際の保存量から、**Internet Archiveの210 PB超 → CERNの1 EB → Colossusの10 EB超**。書籍やWebの保存、科学データ、データセンターへと対象の規模が広がる。CERNとECMWFは近いため、どちらかを代表例にして本文で両方に触れられる。
- 期間付きの比較では、**日本の平均1日で約518 PB**、**世界の平均1日で約25 EB**、**世界の1年で約9.2 ZB**。日本は固定回線の下り、世界はITUの固定・モバイルの集計なので、日本を世界全体の取り分として計算しない。世界の日量と年量は同じ推計から得た対比。
- ZB級でも記憶媒体の話を中心にするなら、**Seagateの1年のHDD出荷789 EB**や**世界の設置容量約13 ZB**が候補。**IDCの約218 ZB**は、生成・複製・消費を含むため、一番大きい参考例として扱う場合に向く。

[google-index]: https://www.google.com/intl/en_uk/search/howsearchworks/how-search-works/organizing-information/
[nasa-earth]: https://wiki.earthdata.nasa.gov/download/attachments/378738424/ESDS-RFC-057v1_OFAIR-Guide.pdf?api=v2&modificationDate=1764095753357&version=1
[ia-storage]: https://digitalpreservation.gov/meetings/DSA2026/0117_jonah_edwards_ia_dsa_2026.pdf
[mic-2026]: https://www.soumu.go.jp/menu_news/s-news/01kiban04_02000281.html
[mic-2026-reprint]: https://praze.jp/news/gov-a617681c98d3794244fc8391d4b06418/
[frontier]: https://docs.olcf.ornl.gov/systems/frontier_user_guide.html
[frontier-2022]: https://www.olcf.ornl.gov/wp-content/uploads/2-16-22_orion_lustre_and_best_practices.pdf
[ska-data]: https://www.skao.int/en/explore/big-data
[ska-build]: https://www.skao.int/en/news/174/green-light-given-construction-worlds-largest-radio-telescope-arrays
[cern]: https://home.cern/cern-hits-one-exabyte-stored-experimental-data-lhc/
[ecmwf-history]: https://www.ecmwf.int/sites/default/files/elibrary/81678-the-critical-role-of-highperformance-computing-in-medium-range-weather-forecasting-half-a-century-of-technology-innovation.pdf
[ecmwf-annual]: https://www.ecmwf.int/sites/default/files/elibrary/062025/81665-annual-report-2024.pdf
[spectra]: https://spectralogic.com/tfinity-libraries/
[lto-40]: https://www.fujifilm.com/in/en/news/fujifilm-expands-lto-portfolio-with-lto-10-40tb
[colossus]: https://cloud.google.com/blog/products/storage-data-transfer/how-colossus-optimizes-data-placement-for-performance?e=13802955
[itu-traffic]: https://www.itu.int/itu-d/reports/statistics/2026/10/13/ff26-internet-traffic/
[itu-method]: https://www.itu.int/itu-d/reports/statistics/2026/10/13/ff26-methodology/
[hilbert-doi]: https://doi.org/10.1126/science.1200970
[hilbert-full]: https://pdodds.w3.uvm.edu/files/papers/others/2011/hilbert2011a.pdf
[seagate-fy26]: https://www.sec.gov/Archives/edgar/data/1137789/000113778926000207/stx-20260908.htm
[seagate-fy25]: https://investors.seagate.com/news/news-details/2025/Seagate-Technology-Reports-Fiscal-Fourth-Quarter-and-Fiscal-Year-2025-Financial-Results/
[idc-2026]: https://www.idc.com/resource-center/blog/beyond-the-prompt-the-hidden-data-and-storage-implications-of-generative-ai/
[idc-definitions]: https://www.idc.com/resource-center/definitions/what-are-the-global-datasphere-and-global-storagesphere/
[s3-nov]: https://aws.amazon.com/blogs/storage/aws-named-a-leader-in-idc-marketscape-for-public-cloud-object-storage/
[s3-mar]: https://aws.amazon.com/blogs/aws/twenty-years-of-amazon-s3-and-building-whats-next/
[cc-dec]: https://commoncrawl.org/blog/december-2025-crawl-archive-now-available
[cc-about]: https://www.commoncrawl.org/about
[ia-trillion]: https://blog.archive.org/trillion/
[villalobos]: https://proceedings.mlr.press/v235/villalobos24a.html
[web-performance]: https://almanac.httparchive.org/en/2025/performance
[web-method]: https://almanac.httparchive.org/en/2025/methodology
[youtube-engineering]: https://blog.youtube/inside-youtube/new-era-video-infrastructure/
[youtube-count]: https://blog.youtube/news-and-events/happy-birthday-youtube-20/
