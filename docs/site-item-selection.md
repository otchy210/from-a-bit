# サイト掲載アイテムの選定案：容量順

改訂日：2026-11-25。**容量順に並べたサイト掲載用の45項目。**

媒体・記憶装置39項目、導入2項目、比較4項目。M13（Intel 3101）とM20（初代NAND）は独立した必須項目として残す。調査の母集団は[媒体の調査一覧](storage-history-candidates.md)と[比較データの調査一覧](large-number-candidates.md)に保持する。

## 今回の絞り方

- **世界初・転換点・普及・容量の跳躍**を残す。類似製品、中間世代、普及が限定的な分岐は独立表示から外す。
- **同じジャンルで近い容量は1項目にする。** 例：2DDの640/720/800 KiB、2HDの約1.2～1.44 MB、DVDの各種4.7 GB、DVDの約8.5～9.4 GB、LTO-10の30/40 TB。方式、互換性、外形、個別の容量・年代は本文で説明する。
- **描画基準には、具体的な代表例を1つ選ぶ。** 平均容量や合計容量は作らない。統合する形式すべてが同じ容量だったとも書かない。本文で扱う他の形式に、代表例の面積を厳密な図として流用しない。
- **容量差が大きい中間世代は「近い容量だから統合」とせず、独立表示を削って沿革へ移す。** 例：MOの128/230 MB、Blu-rayの50 GB、LTOの中間世代、EPROMに続くEEPROM。差が見えないという理由で丸める操作とは区別する。
- **同容量でも、主題として残す転換点は分ける。** 20 MBの2.5 inch HDDと初期flash SSDは、回転媒体からflashへの変化を見せるため2項目のまま。同じ100 GBのBDXLとLTOも、光ディスクとテープの比較として残す。
- **揮発メモリの4事例は3項目内に収める。** 1 bitのCRT実験は導入、BabyとIntel 1103は128 B級の項目へ。Intel 3101は独立。現代のDDR/HBM競争は追わない。
- **比較は4項目。** 『こころ』と新聞1日を同じ文字容量帯にまとめ、新聞1年、国会図書館、πを残す。新聞100年、EHT、文字1字、原稿用紙等の独立表示は外す。

## 表の読み方

「代表ID」は[媒体の調査一覧](storage-history-candidates.md)のID。「比較:」は[比較データの調査一覧](large-number-candidates.md)、「PB」で始まるIDは[TBからPBへの補強調査](pb-system-candidates.md)を参照。括弧内などに残す元IDで、何を統合・説明へ移したか追える。連番は今回の掲載順案で、恒久IDではない。

**順序は各項目の代表容量で決める。** 統合範囲は代表値の上下に広がるため、隣の別ジャンルの容量と重なることがある。グループ全体に厳密な大小関係があるという意味ではない。

- **確定・算定**：調査済みの整数、または語数・sector構成等から計算した値。構成・初採用年の照合が残る場合は個別に記す。
- **公称**：メーカー・規格の表示。MB/GB/TB/PBは原則十進だが、歴史資料のKB等は定義を確認するまで公称とする。80 KBは仮80,000 Bの位置に置く。
- **仮換算**：M20の4 Mbitは仮512 KiB、M22の128 Gbitは仮16 GiBとして並べた。厳密構成・予備領域を確認するまで実装用の値にしない。
- **模型・実測変換・研究・定義**：文字コード等の仮定、指定版からの変換、史料上の実証容量、単位の定義。実媒体の有効容量と区別する。

公称・仮換算を含むので、これは確定した実装順ではない。表内の未照合事項は、まとめた後も解決済みとは扱わない。sector総量とファイルの空き容量、情報bitとparity、nativeと圧縮後容量も区別する。

## 容量順の45項目

### 1. 小さな記憶からフロッピーへ

| 順・代表ID | 項目と年代 | 描画の基準にする容量 | 統合する内容・本文に残す違い | 根拠 |
| --- | --- | --- | --- | --- |
| **1・導入:bit** | **1 bit**<br>定義／1946：CRT記憶実験 | 1 bit【定義】 | M01のWilliamsによる1 bit記憶実験をこの導入で紹介する。概念の1 bitに発明年1946を付ける意味ではない。 元ID：M01。 | [Manchester：Baby開発史][baby]、[CHM：CRT記憶][crt] |
| **2・導入:byte** | **1 byte**<br>定義 | 8 bit＝1 B【定義】 | 日本語「あ」はUTF-8で3 Bという話もここで扱い、1文字のための独立した画面は置かない。 元ID：比較:S02。 | [Unicode公式FAQ][unicode] |
| **3・M13** | **Intel 3101 SRAM〔必須〕**<br>1969年4月：発売 | 64 bit＝8 B／チップ【確定】 | Intel最初の製品。64 bitの小ささを単独で見せる。世界初のSRAMとはしない。 | [Intel：3101][intel-3101] |
| **4・M08** | **初期の半導体ROM**<br>1965：Sylvania製作 | 256 bit＝32 B／チップ【研究】 | 半導体に情報を固定する入口。MOS ROM等の初期の方式差は本文へ。広義の「世界初のROM」とは断定しない。 元ID：M09。 | [CHM：半導体ROM][rom] |
| **5・A03** | **IBM 80欄パンチカード**<br>1928：80欄形式／1930：12行版 | 80文字→80 B相当／カード1枚【模型】 | 80文字を1文字1 Bへ転記する比較模型。Hollerithの1890年カードは前史として説明し、同じ形式・容量とは扱わない。 元ID：A02。 | [IBM：パンチカード][ibm-card]、[米国国勢調査局][census] |
| **6・M03** | **128 B級の初期メモリ**<br>1948：Baby／1953：コア／1970：Intel 1103 | 1,024 bit＝128 B／主記憶【確定】 | 描画はBabyの主記憶128 B。コア1面（M05）とDRAM1チップ（M14）も128 Bの事例としてまとめる。比較単位と揮発性は個別に説明する。 元ID：M05・M14。 | [Manchester：Baby開発史][baby]、[CHM：Whirlwind][core]、[CHM：SRAMからDRAMへ][dram] |
| **7・M16** | **窓のあるEPROM**<br>1971：Intel 1702発表 | 2,048 bit＝256 B／チップ【確定】 | 消去して書き直せるROMを、特徴のある窓付きチップで見せる。PROMや電気消去EEPROMへの発展は本文へ移す。 元ID：M15・M18。 | [CHM：プログラマブルROM][eprom]、[Intel 1983 Memory Component Handbook][intel-memory-book] |
| **8・D01** | **初期の磁気ドラム**<br>1932：試作・実演／1933：特許出願 | 500,000 bit＝62,500 B／試作【研究】 | 回転する磁性体へ記録する最初期の研究例。62,500 BはCHM記載で、原特許との容量照合は残る。 | [CHM：磁気ドラム][drum] |
| **9・M10** | **月へ行ったコアロープROM**<br>1966：設計資料／1969：月着陸で使用 | 552,960 bit＝69,120 B／ROM【確定】 | Apollo AGC Block II。36,864語×15情報bit。parityを除いた容量を使い、RAM部分は別項目にしない。 元ID：M11。 | [NASA NTRS：1966年設計資料][apollo-design] |
| **10・F01** | **初期のフロッピー、80～90 KB級**<br>1971：IBM 23FD／1976：Shugart SA400 | 公称80 KB／8 inchディスク【公称】 | 8 inchの読み出し専用80 KBを代表とし、5.25 inchのSA400（公称89.6 kB formatted）も同じ項目で紹介。書き込み可能化と8 inchの容量増加は沿革へ。 元ID：F04・F02・F03・F16・F17。 | [CHM：最初のFD][first-fd]、[IBM：開発史][ibm-fd]、[CHM：minifloppy][minifloppy] |
| **11・F07** | **PC初期のフロッピー、320～400 KB級**<br>1981：ECMA-70初版／1981：Sony 3.5型発売／1984：Mac採用 | 368,640 B＝360 KiB／両面【算定】 | 描画は360 KiBの両面倍密度形式。国内2Dの320 KiB、初期Sony 3.5型の公称322.5 Kbytes、Macの400 KiBも本文にまとめ、互換形式とはしない。規格年とPC採用年は別。 元ID：Q08/320・F09・F10。 | [ECMA-70][ecma70]、[Microsoft：媒体形式][win-media-en]、[Sony OEM manual][sony-oa30]、[Apple：Macintosh 512K仕様][mac400] |
| **12・M20** | **初代NAND flash〔必須〕**<br>1987：発明・研究発表／1991：製品化 | 公称4 Mbit（仮512 KiB）／チップ【仮換算】 | 図は1991年の公称4 Mbit製品。1987年の研究発表に同じ容量を当てない。NORとの用途の違いもこの項目で説明する。 元ID：M19。 | [KIOXIA：技術開発史][kioxia-history]、[Intel開発者の口述記録][flash-oral] |
| **13・比較:B02** | **日本語の小説1冊と新聞1日**<br>1914：『こころ』連載／2026-11-08：電子版取得 | 559,512 B／指定版、UTF-8【実測変換】 | 図は青空文庫の『こころ』をUTF-8へ変換した559,512 B（ルビ・注記込み）。新聞1日の文字模型は約465,000 Bで、ほぼ同じ規模という比較を本文に添える。 元ID：比較:N01。 | [図書カード・初出年][kokoro]、[授業リポート][newspaper] |
| **14・F11** | **2DD世代のフロッピー**<br>1985：ECMA-100初版／1986：Mac Plus発売 | 737,280 B＝720 KiB／両面【算定】 | 描画は3.5型720 KiB。国内640 KiB、5.25型640/720 KiB、Mac 800 KiBは同じ容量帯で紹介。外形・GCR/MFM・書式の違いは本文へ。 元ID：追加:FD3-DD640・追加:FD5-DD640・追加:FD5-DD720・F12。 | [ECMA-100][ecma100]、[Microsoft：媒体形式][win-media-en]、[Apple：Macintosh Plus仕様][mac800] |

### 2. MB級の保存と持ち運び

| 順・代表ID | 項目と年代 | 描画の基準にする容量 | 統合する内容・本文に残す違い | 根拠 |
| --- | --- | --- | --- | --- |
| **15・F13** | **2HD世代のフロッピー**<br>1984：PC/AT導入／1987：ECMA-125初版 | 1,474,560 B＝1,440 KiB／両面【算定】 | 描画は3.5型1,474,560 B。PC/ATの5.25型1,228,800 Bと、国内PC系の1,261,568 Bもまとめる。1.2/1.44 MBという呼び名、密度と容量の違いは説明する。 元ID：F08・Q09/5hd・Q09/3hd。 | [ECMA-125][ecma125]、[IBMサービスマニュアル][ibm12-manual]、[Microsoft：媒体形式][win-media-en] |
| **16・D02** | **世界初の商用HDD、IBM 350**<br>1956：初出荷 | 30,000,000 bit＝3,750,000 B／ドライブ【算定】 | 500万文字×6情報bit＝3,750,000 B。巨大な装置から始まるHDD史の柱。通俗的な5 MBと区別する。 | [CHM：RAMAC][ramac]、[IBM：RAMAC][ibm-ramac] |
| **17・D06** | **PC向けの小型HDD**<br>1980：ST-506／1983：Rodime 3.5型導入 | 公称5 MB formatted／ドライブ【公称】 | 図はST-506の公称5 MB formatted。5.25型から3.5型へという変化もここで説明する。Rodimeの既知の6.38/12.75 MBはunformattedなので、同じ実容量として扱わない。 元ID：D08。 | [CHM：ST-506研究ノート][st506]、[CHM：Rodime研究ノート][rodime] |
| **18・C04** | **初期のメモリーカード**<br>1998：Memory Stick／2000：初期SD導入 | 公称8 MB／カード【公称】 | 描画は初期SDの公称8 MB。同容量のMemory Stick 8 MBをまとめ、4 MB版やxD 16 MB、CF・microSD・USBメモリー等への展開は本文へ。SDの規格上限を初期実製品容量にしない。 元ID：C03・C02・C05・C01・C07・Q13。 | [SD Association：初期カードの説明][sd-initial]、[Sony：発売発表][memorystick]、[Olympus：当時の発表][xd]、[公式20年史][sd-years] |
| **19・D09** | **ノートPCへつながる2.5 inch HDD**<br>1988：PrairieTek 220導入 | 公称20 MB／ドライブ【公称】 | 公称20 MB。次の初期flash SSDとは同容量でも記録原理が違うため、独立させる。 | [CHM：小型HDD][mini-hdd] |
| **20・D10** | **初期のflash SSD**<br>1991：SunDiskのIBM向け納入 | 公称20 MB／ドライブ【公称】 | 公称20 MB。回転しないストレージへの転換点として単独で残す。「SSD全般の最初」ではなくflash SSDの節目。 | [Eli Harari：2011年IMW論文][harari-ssd]、[CHM：SSD][ssd-history] |
| **21・D04/35** | **Winchester方式のHDD**<br>1973：IBM 3340/3348導入 | 公称35 MB／モジュール【公称】 | 図は35 MBのデータモジュール。70 MB版と交換式ディスクパックの前史は本文に移し、中間容量で画面を増やさない。 元ID：D04/70・D03。 | [CHM：Winchester][winchester]、[CHM：ディスクパック][disk-pack] |
| **22・F15** | **Zip 100**<br>1994：発表 | 公称100 MB／ディスク【公称】 | 家庭・仕事で使われた大容量リムーバブル。公称100 MBでFDからの跳躍を見せる。厳密B数は仕様照合待ち。 | [CHM：minifloppy][minifloppy] |
| **23・比較:N03** | **新聞1年分の文字**<br>2022：文字数説明／2026：換算模型 | 約169,725,000 B【模型】 | 約15.5万字×3 B×365日。写真や紙面を含まない。新聞100年分の独立項目は置かない。 | [授業リポート][newspaper] |
| **24・T03** | **カートリッジ式の業務用テープ**<br>1984-03-22：IBM 3480一般提供 | 公称200 MB native／巻【公称】 | 図は3480の公称200 MB native。UNISERVOやIBM 726の初期商用テープ、オープンリールからの変化はこの本文で紹介。初期テープの「桁」をBへ置換しない。 元ID：T01・T02。 | [IBM：ライフサイクル][ibm3480-year]、[IBM：仕様一覧][ibm3480-cap]、[CHM：UNISERVO][tape-first] |
| **25・O10** | **MO、640 MB級**<br>1988：初期5.25型／1991：3.5型／1997：640 MBのISO規格 | 公称640 MB／3.5 inch媒体【公称】 | 描画は3.5型640 MB。近い540 MB・5.25型650 MBをまとめる。128/230 MBからGIGAMO 1.3/2.3 GBまでの推移は本文の沿革へ移す。 元ID：O09・O05・O07・O08・O12・O13。 | [富士通：仕様][mo640-spec]、[Sony 1991年報][sony-ar1991]、[富士通・Sony：回顧付き発表][gigamo] |
| **26・O02** | **CD、650 MB級**<br>1982：音楽CD／1985：CD-ROM研究発表／1988：ECMA初版 | 681,984,000 B／74分の構成例【算定】 | 図は74分のCD-ROM Mode 1、681,984,000 B。CD-R・CD-RWもここで説明。音楽CDは同時間でもPCM本体が約783 MBとなり、ユーザーデータ容量と同じではない。初期CD-Rの容量は未照合。 元ID：O04・O01・O03。 | [CD-ROM規格][ecma130]、[Sony：CD開発史][cd-history]、[太陽誘電の沿革][cdr-yuden]、[Ricoh：沿革][cdrw-ricoh] |

### 3. GB級の媒体とフラッシュ

| 順・代表ID | 項目と年代 | 描画の基準にする容量 | 統合する内容・本文に残す違い | 根拠 |
| --- | --- | --- | --- | --- |
| **27・D07** | **GBに届いた業務用HDD**<br>1980：IBM 3380発表 | 公称2.52 GB／2 HDAユニット【公称】 | 公称2.52 GB、2 HDAを持つユニット全体。1 HDAの約1.26 GBと混ぜない。実際の初出荷時期は照合を残す。 | [IBM：Description and User's Guide][ibm3380-manual] |
| **28・O19** | **DVD、片面1層4.7 GB級**<br>1997：DVD-ROMのECMA初版／各記録型は後続 | 公称4.7 GB／片面【公称】 | DVD-ROM・DVD-R・DVD+R・DVD-RW・DVD+RW・4.7 GB DVD-RAMを1項目にする。描画はDVD-5の公称4.7 GB。+Rの正確な4,700,372,992 Bや方式・互換性の差は本文へ。 元ID：O24・O25・O26・O27・O29/single。 | [ECMA-267][ecma267]、[ECMA-349初版PDF][ecma349]、[ECMA-330][ecma330] |
| **29・O20** | **DVDの大容量化、8.5～9.4 GB級**<br>1997：DVD-ROMのECMA初版／記録型DLは後続 | 公称8.5 GB／片面2層【公称】 | 描画は片面2層DVD-9の公称8.5 GB。DVD±R DLの8.54/8.55 GBと、両面9.4 GBの形式もまとめ、2層と両面の違いを説明する。 元ID：O30・O31・O21・O29/double。 | [ECMA-267][ecma267]、[ECMA-364][ecma364]、[ECMA-382][ecma382]、[ECMA-330][ecma330] |
| **30・M22** | **3D NAND、積層して増やす**<br>2013：Samsung第1世代V-NAND量産 | 公称128 Gbit（仮16 GiB）／ダイ【仮換算】 | 図は128 Gbitの1ダイ（仮16 GiB）。東芝の2007年3D技術発表や2015年48層BiCS 256 Gbitは沿革へ。ダイ容量に層数を再度掛けない。 元ID：M23。 | [Samsung：V-NAND世代表][vnand]、[KIOXIA：技術開発史][kioxia-history]、[KIOXIA／当時東芝：発表][bics256] |
| **31・O33/25** | **Blu-ray Disc、25 GB級**<br>2002：基本仕様発表／2006：BD-ROM米国量産発表 | 公称25 GB／片面1層【公称】 | 描画は25 GBのBD-ROM。BD-R/REの同容量形式をまとめ、初期23.3 GB、2層50 GBは本文で扱う。全方式の初発売が2006年という意味ではない。 元ID：O34/25・O35/25・O32/23.3・O33/50・O34/50・O35/50。 | [9社共同発表／Sony][bd2002]、[Sony DADC：2006年発表][bd2006]、[Sony：媒体容量][bd-capacity] |
| **32・O36** | **BDXL、100～128 GB級**<br>2010-06-25：仕様確定 | 公称100 GB／3層【公称】 | 図は3層BD-R 100 GB。BD-RE 100 GBと4層BD-R 128 GBをまとめる。100 GBの媒体全てが追記型・3層だとはしない。 元ID：O37・O38。 | [BDA：仕様確定発表][bdxl] |
| **33・T04** | **LTOの始まり、100 GB**<br>2000：LTO Ultrium 1市場導入 | 100 GB native／巻【公称】 | DC・業務用テープの現代につながる規格。LTO-2～4の中間容量は沿革だけにし、巻ごとの非圧縮容量で比較する。 元ID：T05・T06・T07。 | [LTO公式沿革][lto-archive]、[IBM：容量一覧][lto-cap] |

### 4. TBからPBへ

| 順・代表ID | 項目と年代 | 描画の基準にする容量 | 統合する内容・本文に残す違い | 根拠 |
| --- | --- | --- | --- | --- |
| **34・D12** | **1 TB HDD**<br>2007-01-05：Deskstar 7K1000発表 | 公称1 TB／ドライブ【公称】 | 家庭用PCにもつながる単体HDDの1 TB到達。発表・出荷予定と実出荷日は区別する。 | [Hitachi：当時の発表][hitachi-1tb] |
| **35・T08** | **LTOもTB級へ**<br>2010：LTO Ultrium 5規格・互換認証 | 1.5 TB native／巻【公称】 | 1.5 TB native。LTFSやパーティションの世代として残す。以後の2.5/6/12/18 TBの中間世代は本文へ。 元ID：T09・T10・T11・T12。 | [LTO公式沿革][lto-archive]、[Fujifilm：仕様][lto-fuji] |
| **36・比較:L01** | **国立国会図書館の図書を文字に**<br>2025年度末：図書数／2026：換算模型 | 約11.368 TB／仮定した全文字【模型】 | 12,631,196点×1冊30万字×3 B。図書館が公表した実データ容量ではなく、ページ数・文字密度を仮定した約11.368 TB。 | [NDL公式統計][ndl] |
| **37・D13** | **2.5 inch SSDに15 TB超**<br>2016年3月：Samsung PM1633a出荷発表 | 公称15.36 TB／2.5 inch SSD【公称】 | 公称15.36 TBの単体SSD。初期20 MB SSDとの大きな隔たりと、DCでの用途を伝える。 | [Samsung：出荷発表][samsung-1536] |
| **38・D14** | **HDDは30 TB級へ**<br>2024-01-17：Seagate HAMR量産拡大発表 | 公称30 TB級／HDD【公称】 | 磁気記録も進化し続けることを示す。公称30 TB級とし、実装時は描く型番を固定する。 | [Seagate：当時の発表][hamr] |
| **39・T14** | **LTOは30～40 TB級へ**<br>2025：LTO-10 30 TB仕様／2026：40 TB媒体発売告知 | 40 TB native／巻【公称】 | 描画は40 TB native。30 TB版も同じ項目へ。圧縮時の75/100 TBを記憶容量にしない。 元ID：T13。 | [LTO：2025年発表][lto10]、[Fujifilm：40 TB発売発表][lto40]、[LTO：互換性][lto-compat] |
| **40・D15** | **単体SSDに245.76 TB**<br>2025-07-22：開発発表／2026：サーバー構成発表 | 公称245.76 TB／E3.L SSD【公称】 | KIOXIA LC9、E3.Lのモデル。初期発表・その後の構成を区別し、この容量が全フォームファクターにあるとしない。 | [KIOXIA：2025年発表][lc9]、[2026年構成][pb-server] |
| **41・比較:P01** | **πの314兆桁を文字で保存**<br>2025：計算・発表／2026-11-08：記録確認 | 314 TB／数字のみの模型【模型】 | 314兆個の数字をASCIIで1桁1 Bとする314 TBの模型。計算中の作業領域ではなく、数字列の保存を比べる。 | [開発者記録表][pi-records]、[StorageReviewの一次報告][pi-run] |
| **42・PB02** | **2UのHDDサーバーに616 TB**<br>2023年5月のDell仕様書／2026：HPE Gen4構成資料 | 公称合計616 TB raw／2Uサーバー【公称】 | 図はDell PowerEdge R760xd2の22 TB×28台。ここから装置全体の容量を比べる。高さが同じ2UのHPE MSL2024 Gen4は、LTO-9の18 TB×24巻で非圧縮432 TBと本文で紹介する。元ID：PB01。 | [Dell仕様書][dell-hdd-2u]、[HPE日本語構成図][hpe-lto-2u] |
| **43・PB03** | **4UのHDDストレージに2.5 PB**<br>2023-11-14：2.5 PB構成発表 | 公称2.5 PB raw／4Uの1筐体【公称】 | Seagate Exos CORVAULT 4U106。4Uの筐体にHDDと冗長コントローラーを収める。描画には保護領域などを差し引く前の公称値を使う。 | [Seagate発表][corvault-release]、[Seagate仕様書][corvault-spec] |
| **44・X01** | **40台のSSDで約9.8 PB**<br>2026-05-15：Dell/KIOXIAシステム実現発表 | 公称合計9.8304 PB／2Uサーバー【公称】 | Dell PowerEdge R7725xdにKIOXIA LC9を40台搭載。245.76 TB×40＝9.8304 PB。RAID・ファイルシステムを差し引く前。 | [2026年構成][pb-server] |
| **45・PB04** | **テープライブラリー1筐体に80.64 PB**<br>2024：製品の一般提供開始／2026：40 TB LTO-10構成を仕様書で確認 | 最大80.64 PB native／48Uの1筐体【公称】 | Quantum Scalar i7 RAPTOR。LTO-10の40 TB×2,016巻を全スロットに収める場合の非圧縮容量。搬入出用スロットなどの割当に応じてデータ用の巻数は変わる。 | [Quantum仕様書][raptor-spec]、[Quantum設置ガイド][raptor-guide]、[一般提供の発表][raptor-ga] |

41～45番の容量比、構成上限、年代の根拠は[TBからPBへの補強調査](pb-system-candidates.md)を参照。

## 主な統合結果

| 以前分けていたもの | 改訂後 | 描画の代表例 |
| --- | --- | --- |
| 抽象的な1 bitと1 bitのCRT実験 | 導入の1項目 | 1 bit |
| Baby、コア1面、Intel 1103 | 128 B級の初期メモリの1項目 | Babyの主記憶128 B。コアは1面、DRAMは1チップという単位を本文に残す。 |
| 最初の8 inch FDDと初期5.25 inch FDD | 80～90 KB級の1項目 | IBM 23FDの公称80 KB |
| 国内2D、PCの360 KB、初期Sony 3.5型、Mac 400K | 320～400 KB級の1項目 | PCの360 KiB形式 |
| 640/720/800 KiBのFD | 2DD世代の1項目 | 3.5型720 KiB |
| PC/ATの1.2 MB、国内PCの1,232 KiB、1.44 MB | 2HD世代の1項目 | 3.5型1,474,560 B |
| 初期SD 8 MB、Memory Stick 8 MB | 初期メモリーカードの1項目 | SDの公称8 MB。前後の4/16 MB品や他形式は沿革として説明。 |
| MOの540/640/650 MB | MOの1項目 | 3.5型640 MB。128/230 MBやGIGAMOは沿革として説明。 |
| CD-ROM・CD-R・CD-RW・音楽CD | CDの1項目 | 74分CD-ROM Mode 1の681,984,000 B。音声ペイロードとの違いは本文へ。 |
| DVD-ROMとDVD±R/±RW/RAMの4.7 GB級 | 片面1層DVDの1項目 | DVD-5の公称4.7 GB |
| DVD-9、DVD±R DL、両面9.4 GBのDVD | 大容量DVDの1項目 | DVD-9の公称8.5 GB。2層と両面は本文で区別。 |
| BD-ROM/R/REの25 GB | Blu-rayの1項目 | BD-ROMの25 GB。50 GB等の容量推移は沿革へ。 |
| BDXLの100/128 GB、R/RE | BDXLの1項目 | BD-Rの100 GB |
| LTO-10の30/40 TB | 現代LTOの1項目 | 40 TB native |
| 2U HDDサーバーと2U LTOライブラリー | 42番にまとめ、LTOの非圧縮432 TBは本文で紹介 | Dell PowerEdge R760xd2の616 TB raw |
| 『こころ』約560 kBと新聞1日の文字約465 kB | 日本語テキストの1項目 | 『こころ』の指定版559,512 B |

上の表は「似た容量の統合」と「沿革への移動」を区別している。例えば、EEPROM 2 KiBとEPROM 256 B、MO 128 MBと640 MB、Blu-ray 25 GBと50 GBを、同じ容量として描くわけではない。

## 独立表示から外したもの

| 外すまとまり | 判断・残す場所 |
| --- | --- |
| 小さな比較の目印：ひらがな1字、紙テープ8行、原稿用紙1枚 | ズームの序盤が細かくなりすぎる。文字コードはbyteの本文へ。紙媒体の主役はパンチカードへ絞る。 |
| IC PROM、EEPROM、初期NOR、MOS ROMの別方式 | 技術史の分岐を全部独立させない。EPROM・初代NAND・初期半導体ROMの説明に残す。 |
| 磁気バブル、MRAM、3D XPoint、Optane | 面白いが、普及した永続ストレージの流れを追う本編から外す。 |
| FDの160/180 KB、Apple IIの13/16-sector、8 inchの各中間容量、2ED | PCの320～400 KB、2DD、2HDを代表にする。初期FDの書き込み可能化や容量の拡張は本文へ。 |
| 大径MOの各規格、NeXT MO、PD、MD DATA、Hi-MD、UDO、Microdrive | 普及度・説明量と主題への寄与を比べ、今回は独立表示を外す。MO・HDDの沿革で必要なら短く触れる。 |
| 初期DVD-R 3.95 GB、DVD-RAM 2.6/5.2 GB、DVD-18 | 普及した4.7 GBと大容量8.5 GB級で代表させる。方式ごとの詳細史は主軸から外す。 |
| Memory Stick PROの容量違い、フラッシュの後続ダイ容量 | 小型カードと3D NANDの代表例に集中する。 |
| LTO-2/3/4/6/7/8/9の各独立項目 | LTOは100 GB→1.5 TB→30～40 TBの3項目。中間世代と年は必要に応じて本文へ。 |
| 新聞100年分、EHT、ほかの大量データ・個数の比喩 | 比較は4項目に限定。コンピュータの記憶媒体を主役にし、終点は80.64 PBのテープライブラリーにする。 |
| 前案の未配置12枠をすべて別項目にする計画 | 自動追加しない。初期テープ、初期CD-R、CF/microSD/USB、初期3.5 inch HDD等は現在の関連項目の本文で扱い、容量確認が必要ならそこに課題を残す。Z1/Z3・ABC等を含む独立の前史拡張は今回見送る。 |

## 代表例・説明を確定するときの確認

- [ ] 掲載数をさらに絞る場合は、Zip、コアロープROM、Winchester、初期2.5 inch HDDなどを見直す。M13・M20は維持する。
- [ ] 代表容量を原典で固定する。とくに公称KB、チップのMbit/Gbit、MO/DVD/BDの正確なデータ領域、HDD/SSDの特定型番。
- [ ] 一つにまとめた項目でも、各製品の初出年・容量・方式・比較単位を本文で取り違えない。代表例の年を全ジャンルの発明年にしない。
- [ ] 初期テープの符号と巻長、初期CD-Rの収録時間、初期CF/microSD/USBの実製品、Rodimeのformatted容量は引き続き照合する。未照合の数字は説明にも断定して入れない。
- [ ] 『こころ』の版・注記、新聞と図書館の文字数模型を確定する。日本語1文字3 Bは模型の基本で、実測値を一律に置き換えない。

## 出典

2026-11-08～09の[媒体調査](storage-history-candidates.md)と[比較データ調査](large-number-candidates.md)、2026-11-25の[TBからPBへの補強調査](pb-system-candidates.md)に基づく。

[baby]: https://curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/new.baby.html
[crt]: https://www.computerhistory.org/storageengine/williams-demonstrates-crt-storage/
[unicode]: https://www.unicode.org/faq/utf_bom.html
[intel-3101]: https://www.intel.com/content/www/us/en/history/virtual-vault/articles/intels-first-product-3101.html
[rom]: https://www.computerhistory.org/siliconengine/semiconductor-read-only-memory-chips-appear/
[ibm-card]: https://www.ibm.com/history/punched-card
[census]: https://www.census.gov/programs-surveys/decennial-census/decade/1890/about-1890.html
[core]: https://www.computerhistory.org/storageengine/whirlwind-computer-debuts-core-memory/
[dram]: https://www.computerhistory.org/siliconengine/mos-dynamic-ram-competes-with-magnetic-core-memory-on-price/
[eprom]: https://www.computerhistory.org/siliconengine/reusable-programmable-rom-introduces-iterative-design-flexibility/
[intel-memory-book]: https://www.bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf
[drum]: https://www.computerhistory.org/storageengine/tauschek-patents-magnetic-drum-storage/
[apollo-design]: https://ntrs.nasa.gov/api/citations/19660019469/downloads/19660019469.pdf
[first-fd]: https://www.computerhistory.org/storageengine/floppy-disk-loads-mainframe-computer-data/
[ibm-fd]: https://www.ibm.com/history/floppy-disk
[minifloppy]: https://www.computerhistory.org/storageengine/minicomputers-stimulate-floppy-disk-sales/
[ecma70]: https://ecma-international.org/publications-and-standards/standards/ecma-70/
[win-media-en]: https://learn.microsoft.com/en-us/windows/win32/api/winioctl/ne-winioctl-media_type
[sony-oa30]: https://bitsavers.org/pdf/sony/floppy/Sony_Micro_Floppy_Disk_Drive_Model_0A-D30V_OEM_Manual_Mar82.pdf
[mac400]: https://support.apple.com/en-us/112187
[kioxia-history]: https://www.kioxia.com/ja-jp/rd/technology/history.html
[flash-oral]: https://archive.computerhistory.org/resources/access/text/2012/04/102658199-05-01-acc.pdf
[kokoro]: https://www.aozora.gr.jp/cards/000148/card773.html
[newspaper]: https://oshihaku.jp/teacher/classreport/14754625
[ecma100]: https://ecma-international.org/publications-and-standards/standards/ecma-100/
[mac800]: https://support.apple.com/en-ae/112183
[ecma125]: https://ecma-international.org/publications-and-standards/standards/ecma-125/
[ibm12-manual]: https://www.manualslib.com/manual/1015063/Ibm-6151.html?page=511
[ramac]: https://www.computerhistory.org/storageengine/first-commercial-hard-disk-drive-shipped/
[ibm-ramac]: https://www.ibm.com/history/ramac
[st506]: https://s3.computerhistory.org/groups/ds-seagate-st-506.pdf
[rodime]: https://s3.computerhistory.org/groups/rodime-ro352.pdf
[sd-initial]: https://www.sdcard.org/press/thoughtleadership/anatomy-of-an-sd-memory-card-what-matters-most-for-photography-and-videography/
[memorystick]: https://www.sony.com/en/SonyInfo/News/Press/199807/98-067/
[xd]: https://www.olympus.co.jp/jp/news/2002b/nr020822xdcardj.html
[sd-years]: https://www.sdcard.org/pdf/SDA20thAnniversary_Infographic.pdf
[mini-hdd]: https://www.computerhistory.org/storageengine/miniature-disk-drives-enable-mobile-computing/
[harari-ssd]: https://ethw-images.s3.us-east-va.perf.cloud.ovh.us/ethw/2/29/Ref7-IMW-2011.pdf
[ssd-history]: https://www.computerhistory.org/storageengine/solid-state-drive-module-demonstrated/
[winchester]: https://www.computerhistory.org/storageengine/winchester-pioneers-key-hdd-technology/
[disk-pack]: https://www.computerhistory.org/storageengine/disk-packs-offer-portability-security/
[ibm3480-year]: https://www.ibm.com/support/pages/node/7093315
[ibm3480-cap]: https://www.ibm.com/support/pages/node/641919
[tape-first]: https://www.computerhistory.org/storageengine/tape-unit-developed-for-data-storage/
[mo640-spec]: https://www.fujitsu.com/downloads/HK/mce_mcf3064ss.pdf
[sony-ar1991]: https://www.sony.com/en/SonyInfo/IR/library/ar/8ido18000005flxn-att/1991-E.pdf
[gigamo]: https://info.archives.global.fujitsu/jp/news/1998/Nov/5-e.html
[ecma130]: https://ecma-international.org/publications-and-standards/standards/ecma-130/
[cd-history]: https://www.sony.com/en/SonyInfo/CorporateInfo/History/SonyHistory/2-07.html
[cdr-yuden]: https://www.yuden.co.jp/en/company/history/
[cdrw-ricoh]: https://www.ricoh.com/about/history/1985_1999
[ibm3380-manual]: https://bitsavers.trailing-edge.com/pdf/ibm/dasd/3380/GA26-1664-3_3380_Description_and_Users_Guide_198412.pdf
[ecma267]: https://ecma-international.org/publications-and-standards/standards/ecma-267/
[ecma349]: https://www.ecma-international.org/wp-content/uploads/ECMA-349_1st_edition_december_2003.pdf
[ecma330]: https://ecma-international.org/publications-and-standards/standards/ecma-330/
[ecma364]: https://ecma-international.org/publications-and-standards/standards/ecma-364/
[ecma382]: https://ecma-international.org/publications-and-standards/standards/ecma-382/
[vnand]: https://semiconductor.samsung.com/news-events/news/samsung-electronics-takes-3d-memory-to-new-heights-with-sixth-generation-v-nand-ssds-for-client-computing/
[bics256]: https://www.kioxia.com/ja-jp/about/news/2015/20150804-1.html
[bd2002]: https://www.sony.com/en/SonyInfo/News/Press/200202/02-0219E/
[bd2006]: https://www.sony.com/SonyInfo/IR/news/20060516.pdf
[bd-capacity]: https://www.sony.com/electronics/support/audio-video-accessories-other-av-accessories/dlc-hd50g/articles/00029645
[bdxl]: https://us.blu-raydisc.com/wp-content/uploads/sites/2/2019/09/20100628-BDXL-Specification-Approved.pdf
[lto-archive]: https://www.lto.org/pr-archive/
[lto-cap]: https://www.ibm.com/docs/en/t-tt-and-t?topic=media-data-cartridges
[hitachi-1tb]: https://www.hitachi.com/en-us/press/archive/01052007/
[lto-fuji]: https://www.fujifilm.com/in/en/business/data-management/datastorage/ltotape/specifications
[ndl]: https://www.ndl.go.jp/aboutus/outline/numerically
[samsung-1536]: https://news.samsung.com/us/samsung-introduces-worlds-largest-capacity-15-36tb-ssd-enterprise-storage-systems/
[hamr]: https://www.seagate.com/stories/articles/seagates-breakthrough-30tb-plus-hard-drives-ramp-volume-marking-an-inflection-point-in-the-storage-industry-pr/
[lto10]: https://www.lto.org/2025/08/the-lto-program-introduces-generation-10-of-leading-tape-technology-delivering-unparalled-media-density/
[lto40]: https://www.fujifilm.com/in/en/news/fujifilm-expands-lto-portfolio-with-lto-10-40tb
[lto-compat]: https://www.lto.org/lto-generation-compatibility/
[lc9]: https://www.kioxia.com/ja-jp/business/news/2025/20250722-1.html
[pb-server]: https://www.kioxia.com/ja-jp/business/news/2026/20260515-1.html
[pi-records]: https://www.numberworld.org/y-cruncher/records.html
[pi-run]: https://www.storagereview.com/review/storagereview-sets-new-pi-record-314-trillion-digits-on-a-dell-poweredge-r7725
[dell-hdd-2u]: https://cdn.blueally.com/sanstorageworks/datasheets/poweredge/poweredge-r760xd2-spec-sheet.pdf
[hpe-lto-2u]: https://h50146.www5.hpe.com/directplus_ent/library/pdfs_storage/pl_tape.pdf
[corvault-release]: https://www.seagate.com/stories/articles/seagate-takes-its-high-performing-multi-petabyte-capacity-block-storage-system-to-new-heights-reaching-2-5-pb-pr/
[corvault-spec]: https://www.seagate.com/content/dam/seagate/en/content-fragments/products/datasheets/exos-pods/corvault-self-healing-storage-DS2058-4-2309US-en_US.pdf
[raptor-spec]: https://cdn.allbound.com/iq-ab/2021/11/Scalar-Tape-DS00559A.pdf
[raptor-guide]: https://qsupport.quantum.com/kb/flare/content/Scalar_i7_RAPTOR/docCenter/Site_Planning_i7.htm
[raptor-ga]: https://d1io3yog0oux5.cloudfront.net/_1f880a8a07b7adc6058553eac190da16/quantum/news/2024-12-04_Quantum_Scalar_i7_RAPTOR_Now_209.pdf
