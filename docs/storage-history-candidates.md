# 記憶装置・メモリ・媒体規格の追加候補

調査日：2026-11-08。From a Bit のコンテンツを選ぶためのレビュー用調査メモ。サイトはコンピュータの記憶容量を主眼にPB級までを扱い、日本語ページをルート `/` に置く。**容量の小さい順に一本の流れ**とし、年代が前後しても各アイテムに年を添える。採用対象・説明文は未決定で、この一覧からサイトの YAML へはまだ転記しない。

小説・新聞・図書館・自然界の数などの比較対象は、[比較用のデータ量と大きな数字](large-number-candidates.md)を参照。

**主要候補130件、追加調査枠16件**。件数は表の行数で、容量違いを一つの行にまとめた候補も含む。まず「11. 最初の採用レビュー案」で範囲を決め、各分野の表で年・容量・出典を確認する使い方を想定している。

| 分野 | 主要候補数 | 主な内容 |
| --- | ---: | --- |
| 前史・紙媒体 | 4 | ジャカード、Hollerith、IBMカード、紙テープ |
| メモリ | 27 | CRT、遅延線、コア、ROM、SRAM、DRAM、EEPROM、flash、MRAM、HBM等 |
| ドラム・HDD・SSD | 15 | 初期ドラム、RAMAC、寸法の変化、RAM SSD、flash SSD |
| FD・リムーバブル磁気ディスク | 17 | 8／5.25／3.5 inch、PCとMacの形式差、Zip |
| テープ | 14 | UNISERVO、IBM 726・3480、LTO各世代 |
| MO・光ディスク | 42 | MO各形式、CD、DVD各方式・層数、Blu-ray、MD、UDO |
| フラッシュカード | 10 | CF、Memory Stick、SD、xD、microSD、容量クラス |
| PB級システム | 1 | SSD 40台を搭載した2Uサーバー |

## この一覧の読み方

- 年には必ず意味を添える。**発明・試作／発表／製品化・発売・出荷／規格制定**は別の出来事である。「規格：1997」は、その媒体が1997年に初めて販売されたという意味ではない。
- 容量の比較単位は原則として **1チップ、1枚、1巻、1台**。メモリの1面、複数ドライブを集めたシステムなど、例外はその都度記す。
- **bit** は情報ビット、**B** は8 bitのバイト。KiB・MiB・GiBは二進、kB・MB・GB・TB・PBは十進。ただし当時の「KB」「MB」の表記はそのまま引用せず、**公称**を付けて区別する。
- **確定値**は資料に明記された整数または明示した構成からの換算値。**公称**はメーカー／規格の容量表示で、厳密なユーザーデータのバイト数を未照合。公称値に10の累乗を掛けるだけで、正確な capacityBits が得られたとは扱わない。
- **要照合**は年・容量・対象の範囲などに未解決点がある候補。空欄を推測で埋めない。歴史の説明には使えても、ズームの容量値は確認後に決める。
- 出典は **一次：当事者の発表、マニュアル、論文／規格：制定団体／所蔵・研究：博物館、大学等**。メーカーの回顧記事は当事者資料だが、同時代の設計資料より簡略化されている場合がある。保存先が博物館や資料アーカイブでも、メーカー作成のマニュアル自体は一次資料として扱う。
- 規格団体のページでは主に概要・初版／改訂版の年月を確認した。リンク先PDFの全条項を精査した一覧ではない。特にMO・光ディスクの欠陥代替領域、予備領域、ファイルシステムの差し引きは追加確認が必要。

## 1. 穴を記憶にする：前史・パンチカード・紙テープ

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| A01 | 1801：実演 | ジャカード織機のパンチカード | 1枚の穴数・カード寸法による。**容量未固定** | 命令を媒体に固定する前史。電子計算機の記憶装置でも、史上最初の穴あき媒体でもない。固定のbit数を付けるには特定の現物を選ぶ。 | [CHM：ジャカード][jacquard]（所蔵・研究） |
| A02 | 1890：国勢調査で使用 | Hollerith の国勢調査用カード | 1枚に人口調査の属性を符号化。**bit換算は保留** | 集計機による機械可読データ保存の主軸候補。1928年のIBM 80欄カードとは形・符号が違う。 | [米国国勢調査局][census]（一次・公的史料）、[Smithsonian][smithsonian-card]（所蔵・研究） |
| A03 | 1928：80欄形式導入、1930：12行版 | IBM 80欄パンチカード | 通常の文字用途では **80文字／枚**。12×80＝960の穿孔位置 | 「960 bitの自由な二進データ」「80 B」と無条件には置かない。文字符号、バイナリー穿孔、読取装置で有効容量が変わる。比較値を決める際は符号方式も指定。 | [IBM：パンチカード][ibm-card]（当事者の回顧） |
| A04 | 1949：EDSACで使用 | 5単位の紙テープ | **5 bit／データ1行**。1巻の容量は長さによる | 小容量の段階に置きやすい。一方、送り穴は情報bitに数えない。5行、1 m、1巻など任意の長さを媒体固有の容量と混同しない。 | [Cambridge：EDSACと紙テープ][edsac-simulator]（大学・研究資料） |

## 2. 主記憶と不揮発メモリ

揮発性メモリも含める。電源を切って保持できるかどうかは、容量とは別の属性として説明したい。

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| M01 | 1946年10月：実証 | Williams のCRT記憶実験 | **1 bit／実験装置** | 抽象的な1 bitを、実際に記憶した歴史につなげられる。後のWilliams–Kilburn管とBabyの容量とは別。 | [Manchester：Baby開発史][baby]（開発大学の史料）、[CHM：CRT記憶][crt]（所蔵・研究） |
| M02 | 1947年12月：実験報告 | Williams–Kilburn管の試験用ストア | **2,048 bit＝256 B／管** | Babyより大きい先行試験ストア。ただしbitの設定が手動であり、実用的な計算機のRAMと同じ完成度ではない。 | [Manchester][baby]（開発大学の史料） |
| M03 | 1948-06-21：初プログラム実行 | Manchester Baby のCRT主記憶 | **32語×32 bit＝1,024 bit＝128 B** | 電子的なプログラム内蔵方式を実証した計算機の主記憶。M02の2,048 bitをBabyに流用しない。 | [Manchester：仕様][baby]（開発大学の史料） |
| M04 | 1949-05-06：初実行 | EDSAC の水銀遅延線メモリ | 初期 **512短語×17 bit＝8,704 bit** が比較候補。**構成の最終照合が必要** | 音の伝搬時間を記憶に使う。「512語×35 bit」「1,024語×17 bit」は拡張後・長語／短語の数え方が混じる。下記の照合メモ参照。 | [Cambridge：統計][edsac-stat]、[初期ログ][edsac-log]、[語の構成][edsac-poster]（大学・研究資料） |
| M05 | 1953年8月：Whirlwindで実証 | 磁気コアメモリの1面 | **32×32＝1,024 bit＝128 B／面** | 初期の実用磁気コア記憶。表示単位は計算機全体ではなく1面と明記する。全体の語数は増設時期も照合が必要。 | [CHM：Whirlwind][core]（所蔵・研究）、[当時のONR資料][core-onr]（一次資料の保存版） |
| M06 | 1962：商用提供 | UNIVAC 1107 の薄膜メモリ | **128語のレジスタ群**。36 bit語なら **4,608 bit＝576 B**、語長はマニュアル追加照合 | 磁気薄膜による高速記憶。16,384語の主記憶は磁気コアで、薄膜メモリの容量ではない。 | [CHM：薄膜メモリ][thin-film]（所蔵・研究） |
| M07 | 1964：設計 | Fairchild の64-bit MOS SRAM | **64 bit＝8 B／チップ** | 初期MOS SRAM。Intel 3101以前の例として重要。「世界初のRAM」まで広げない。 | [CHM：SRAMからDRAMへ][dram]（研究史） |
| M08 | 1965：製作 | Sylvania のbipolar TTL ROM | **256 bit＝32 B／チップ** | **初期の半導体ROM IC**候補。試作は金属リンクを手で切断、量産注文はマスクプログラム。広義の「世界初のROM」とは断定しない。 | [CHM：半導体ROM][rom]（研究史、当時の文献案内あり） |
| M09 | 1965：開発 | General Microelectronics のMOS ROM | **1,024 bit＝128 B／チップ** | 同年のTTL ROMとMOS ROMを別候補にする。半導体ROMの方式と容量差を説明できる。 | [CHM：半導体ROM][rom]（研究史） |
| M10 | 1966：設計資料、1969：月着陸で使用 | Apollo Guidance Computer Block II のコアロープROM | **36,864語×15情報bit＝552,960 bit＝69,120 B** | ワイヤーの通し方にプログラムを固定。各語には別に1 parity bitがある。1969年を発明年にしない。 | [NASA NTRS：1966年設計資料][apollo-design]（一次） |
| M11 | 1966：設計資料 | 同 AGC Block II のerasable磁気コアRAM | **2,048語×15情報bit＝30,720 bit＝3,840 B** | ROMとRAMを同じ計算機内で比較できる。こちらも1 parity bit／語を容量から除外。 | [NASA NTRS：設計資料][apollo-design]（一次） |
| M12 | 1968：開発 | Fairchild の初期DRAM | **256 bit＝32 B／チップ** | 1970年のIntel 1103を「史上最初のDRAM」と書かないための重要な先行例。試作・販売の範囲は追加確認。 | [CHM：DRAM][dram]（研究史） |
| M13 | 1969年4月：発売 | Intel 3101 bipolar SRAM | **64 bit＝8 B／チップ** | **Intel最初の製品**。世界初のSRAMではない。 | [Intel：3101][intel-3101]（当事者の回顧） |
| M14 | 1970：導入 | Intel 1103 DRAM | **1,024 bit＝128 B／チップ** | 商業的に大きく成功し、磁気コアとの価格競争を変えたDRAM。単に「世界初のDRAM」とはしない。 | [CHM：DRAM][dram]、[1970年EDNの記事][edn-1103]（同時代資料） |
| M15 | 1970：導入 | Radiation Inc. のヒューズPROM | **512 bit＝64 B／チップ** | 利用者が1回だけ書き込むIC PROMの初期例。1950年代のPROM発明と区別する。 | [CHM：プログラマブルROM][eprom]（研究史） |
| M16 | 1971：発表 | Intel 1702 EPROM | **2,048 bit＝256 B／チップ** | **最初期の商用UV消去EPROM**。窓付きパッケージが図としても伝わりやすい。 | [CHM：EPROM][eprom]（研究史、Frohman本人の論文案内あり） |
| M17 | 1979：発表 | Intel 7110 磁気バブルメモリ | 公称 **1 Mbit／チップ**。厳密bit数はデータシート照合待ち | 可動部を持たない磁気記憶。CHM展示の4 Mbit基板全体と、1 Mbitチップを分ける。発表後の量産出荷は翌年の可能性がある。 | [Intel：7110][bubble]、[1979年の製品紹介][bubble-1979]（当事者回顧・同時代資料） |
| M18 | 1980：製品導入 | Intel 2816 EEPROM | **16,384 bit＝2,048 B／チップ** | 電気的に消去でき、紫外線用の窓を不要にした。1976–78年のセル実証と、製品導入年を分ける。 | [Intel 1983 Memory Component Handbook][intel-memory-book]（一次）、[Intel 1984年報][intel-ar1984]（一次） |
| M19 | 1988年4月：発表 | Intel の256 Kbit NOR flash | 公称 **256 Kbit／チップ**。型番・厳密構成は追加照合 | NORの商用化初期。**フラッシュ全般の世界初製品とはしない**。1987年の東芝商用品との区別が必要。 | [Intel開発者の口述記録][flash-oral]（当事者証言） |
| M20 | 1987：技術発表、1991：製品化 | 東芝の4 Mbit NAND flash | **4 Mbit／チップ**。2の累乗の厳密bit数と予備領域はデータシート照合待ち | **世界初のNAND型フラッシュ製品**の候補。発明年1987と製品年1991を分ける。 | [KIOXIA：技術開発史][kioxia-history]（当事者の回顧） |
| M21 | 2006：商用化 | Freescale の4 Mbit MRAM | 公称 **4 Mbit／チップ** | 初期の商用MRAM。後継Everspinの一次発表資料で2006年・4Mbを確認。広い意味の不揮発RAM全般の世界初ではない。 | [Everspin：開発史スライド][mram]（一次） |
| M22 | 2013：量産世代 | Samsung 第1世代V-NAND | 公称 **128 Gbit／ダイ、24層、MLC** | 3D NANDの商用化。積層枚数を容量にもう一度掛けない。2007年の東芝の技術発表とは別の出来事。 | [Samsung：V-NAND世代表][vnand]（一次） |
| M23 | 2015-08-04：製品化・サンプル出荷発表 | 東芝 48層 BiCS FLASH | 公称 **256 Gbit／ダイ** | 3D NANDの別世代。「世界初の48層256Gb」のように条件を残す。最初の3D NAND量産品という意味ではない。 | [KIOXIA／当時東芝：発表][bics256]（一次） |
| M24 | 2015-07-28：発表 | Intel／Micron 3D XPoint | 公称 **128 Gbit／ダイ** | NANDとは異なる不揮発メモリ。発表をOptane製品の発売年としない。 | [Intel／Micron：共同発表][xpoint]（一次） |
| M25 | 2019：一般提供世代 | Intel Optane DC Persistent Memory | 公称 **128／256／512 GB／DIMM**。別容量を採るなら別行に分割 | チップとモジュールの違いが分かる例。不揮発で、通常のSSDと異なるメモリ接続。GBの正確なバイト定義はSKU資料で追加確認。 | [Intel：技術概要][optane]、[Lenovo：製品ガイド][optane-lenovo]（一次） |
| M26 | 2018-11-15：開発発表 | SK hynix の16 Gbit DDR5 DRAM | 公称 **16 Gbit／チップ** | DDR5という普及規格の開発初期例。2020年のJEDEC正式規格・商品展開とは別。2018年時点の「JEDEC準拠」は当時のメーカー表現として扱う。 | [SK hynix：開発発表][ddr5]（一次） |
| M27 | 2019-08-12：開発発表、2020：量産予定 | SK hynix HBM2E、8層構成 | 公称 **16 GB／パッケージ＝16 Gbitチップ×8個** | 高帯域の積層DRAM。16 GBは1ダイの容量ではない。原発表はHBM初代の登場を2013年とするが、この16 GB製品を初代として描かない。 | [SK hynix：HBM2E発表][hbm2e]（一次） |

## 3. 磁気ドラム・HDD・SSD

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| D01 | 1932：試作・特許 | Tauschek の磁気ドラム | **500,000 bit＝62,500 B／試作装置**とCHMが記載 | HDD以前の回転磁気記憶。特許の記述容量か実測した試作容量かを原特許で追加照合したい。**研究候補**として残す。 | [CHM：磁気ドラム][drum]（研究史） |
| D02 | 1956：初出荷 | IBM 350（IBM 305 RAMAC用） | **5,000,000文字×6情報bit＝30,000,000 bit＝3,750,000 B／ドライブ** | **世界初の商用HDD**。305は計算機、350がドライブ。parity込みの7 bit、通俗的な「5 MB」と区別する。 | [CHM：RAMAC][ramac]、[IBM：RAMAC][ibm-ramac]（研究史・当事者回顧） |
| D03 | 1962年10月：発表 | IBM 1311＋1316取り外し式ディスクパック | 公称 **2,000,000文字／パック**。符号に依存するbit換算は保留 | 14 inchの交換式パック。計算機をまたいで持ち運ぶHDDの節目。「2 MB」への自動置換はしない。 | [CHM：ディスクパック][disk-pack]（研究史、IBMマニュアル案内あり） |
| D04 | 1973：導入 | IBM 3340／3348 Winchester | 公称 **35 MB、70 MB／データモジュール** | ヘッドと媒体をまとめた交換モジュール。固定＋取り外しの装置全体容量と混ぜない。 | [CHM：Winchester][winchester]（研究史、1973年IBM資料案内あり） |
| D05 | 1978：商用品 | StorageTek STC 4305 RAM SSD | 公称 **45 MB／装置** | **フラッシュ以前にもSSDがあった**ことを伝える。揮発RAMとバックアップを使う装置。最初のSSDという無限定の主張は避ける。 | [CHM：SSD][ssd-history]（研究史） |
| D06 | 1980：導入 | Seagate ST-506、5.25 inch HDD | 公称 **5 MB（formatted）／ドライブ**。unformattedは **6.38 MB** | 最初期の5.25 inch HDD、PC向けHDDの普及につながる。寸法規格そのものが5 MBと決めているわけではない。 | [CHM：ST-506研究ノート][st506]（研究・開発関係者の記録） |
| D07 | 1980：発表、出荷時期は追加照合 | IBM 3380 | 公称 **2.52 GB／ユニット**。HDAは2個、各約1.26 GB | GB級への節目。「1台」「1 HDA」「1アクセス機構」では容量が異なる。1980年の発表と、遅れた初出荷を分ける。 | [IBM：Description and User's Guide][ibm3380-manual]（一次資料の保存版） |
| D08 | 1983年第3四半期：導入 | Rodime RO351／RO352、3.5 inch HDD | 公称 **6.38／12.75 MB（unformatted）／ドライブ** | **最初の商用3.5 inchフォームファクターHDD**。よく見る5／10 MBというformatted値を、ここに無条件に置き換えない。 | [CHM：Rodime研究ノート][rodime]（研究） |
| D09 | 1988：導入 | PrairieTek 220、2.5 inch HDD | 公称 **20 MB／ドライブ** | 2.5 inch HDDの始まり。ノートPCへつながる。 | [CHM：小型HDD][mini-hdd]（研究史） |
| D10 | 1991：試作・納入 | SunDisk のIBM向けflash SSD | 公称 **20 MB／ドライブ** | 初期flash SSD。RAM SSDと分ける。「世界初のSSD」ではなくflash SSDの節目。開発者は1万台をIBMに納入したと記録。 | [Eli Harari：2011年IMW論文][harari-ssd]（一次）、[CHM][ssd-history]（研究史） |
| D11 | 1999：導入 | IBM Microdrive、1 inch HDD | 公称 **170 MB／340 MB／ドライブ** | CompactFlashカードに似た外形でも、中身が回転ディスクだった時代。2容量は採用時に分ける。 | [CHM：小型HDD][mini-hdd]（研究史） |
| D12 | 2007-01-05：発表、同年第1四半期：出荷予定 | Hitachi Deskstar 7K1000 | 公称 **1 TB／ドライブ** | **最初の1 TB HDD**のメーカー発表。発表時の予定と実際の初出荷日の厳密な照合は別途。 | [Hitachi：当時の発表][hitachi-1tb]（一次） |
| D13 | 2016年3月：出荷発表 | Samsung PM1633a SSD | 公称 **15.36 TB／2.5 inchドライブ** | 大容量flash SSDの節目。前年2015年の展示と分ける。 | [Samsung：出荷発表][samsung-1536]（一次） |
| D14 | 2024-01-17：量産拡大発表 | Seagate Mozaic 3+／Exos、HAMR HDD | 公称 **30 TB級／ドライブ** | 熱アシスト磁気記録の量産節目。試作品の記録密度から、販売容量を推算しない。特定の30 TB型番を採用時に固定。 | [Seagate：当時の発表][hamr]（一次） |
| D15 | 2025-07-22：開発発表 | KIOXIA LC9、245.76 TBモデル | 公称 **245.76 TB／SSD** | 100 TBを大きく超える単体SSD。**発表時は開発中**。2026年の資料では245.76 TBはE3.Lのみとされ、2.5 inchとの対応は発表年ごとに確認する。 | [KIOXIA：2025年発表][lc9]、[2026年構成][pb-server]（一次） |

## 4. フロッピーと高容量リムーバブル磁気ディスク

inchは外形／媒体のクラスであり、容量規格ではない。同じ寸法でも片面・両面、密度、セクタ長、OSの書式で別の候補にする。

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| F01 | 1971：初出荷 | IBM 23FD、8 inch、読み出し専用FD | 公称 **80 KB／枚**。正確なB数は要照合 | **最初のFDD／FD**。当初はマイクロコードの配布用。「80 KiB」と先に決めない。 | [CHM：最初のFD][first-fd]、[IBM：開発史][ibm-fd]（研究史・当事者回顧） |
| F02 | 1972：導入 | Memorex 650、8 inch、read/write | 公称 **175 KB／枚** | 初期の汎用書き込み可能FDD。IBMの1973年read/writeモデルより先行。 | [CHM：最初のFD][first-fd]（研究史、OEM manualへの案内あり） |
| F03 | 1973：IBM 3740導入 | 8 inch、IBM 3740互換SSSD | **77×26×128＝256,256 B／枚** | 普及した交換形式。ファイル管理領域を含むデータセクタ総量で、ユーザーファイルの空き容量ではない。ECMA-54初版は1978年。 | [互換機メーカーの仕様][ibm3740-format]（一次資料の保存版）、[ECMA-54][ecma54]（規格） |
| F04 | 1976：発表 | Shugart SA400、5.25 inch minifloppy | 公称 **89.6 kB formatted／109.4 kB unformatted** | **最初の5.25 inch FDD**の候補。よくある「110 KB」は未フォーマット値の丸め。厳密B数はメーカーdata sheetの再照合後に固定。 | [CHM：minifloppy][minifloppy]、[1976年の仕様紹介][sa400-1976]（研究史・同時代資料） |
| F05 | 1978：Disk II導入期 | Apple II Disk II、13-sector形式 | **35×13×256＝116,480 B／片面** | 後の140 KB形式と分ける。初期の13-sectorという構成は同時代記事で確認。年とDOS版の対応はApple原マニュアルで最終照合。 | [Disk IIの当時の記事][disk2-13]（同時代資料） |
| F06 | 1980：DOS 3.3形式の候補年、要原典照合 | Apple II Disk II、16-sector形式 | **35×16×256＝143,360 B＝140 KiB／片面** | 同じドライブ／媒体でも記録方式とROM・DOSで容量が変わる例。**年と構成の原典照合を残す**。 | [Apple II／Disk II関連資料の入口][chm-timeline]（所蔵・研究、追加調査） |
| F07 | 1981：規格初版 | 5.25 inch、両面40-track MFM（ECMA-70） | PCの代表形式なら **40×2×9×512＝368,640 B＝360 KiB**。この構成の規格内対応は要照合 | 規格年とIBM PC DOSの360 KB形式の採用年は同一ではない。ECMA-70にはtrack formatがあり、「同じ5.25 inchだから互換」とは限らない。 | [ECMA-70][ecma70]（規格）、[Microsoft：媒体形式][win-media]（一次） |
| F08 | 1984：IBM PC/ATで導入 | 5.25 inch 2HD、PCの「1.2 MB」形式 | **80×2×15×512＝1,228,800 B＝1,200 KiB** | 普及形式として優先候補。**1.2 MiBではない**。ECMA-99は1985年、形式差は本文照合が必要。 | [IBM：FD史][ibm-fd]、[IBMサービスマニュアル][ibm12-manual]（一次資料）、[ECMA-99][ecma99]（規格） |
| F09 | 1981：発売 | Sony 初代3.5 inch microfloppy | 初期モデルのformatted／unformatted容量は **要照合** | **最初の3.5 inch FD**はぜひ入れたい。後の720 KB／1.44 MBを初代容量として使わない。発売年はソニーの公式記録で確認。 | [Sony：販売終了告知内の沿革][sony-fd]（当事者の回顧） |
| F10 | 1984：Macintosh採用 | 3.5 inch、Mac 400K GCR形式 | 公称 **400K＝409,600 B＝400 KiB／枚**。厳密構成はdisk format資料を追加照合 | PCのMFM形式と別物。同年Macintosh 512KのApple仕様で400Kドライブを確認。 | [Apple：Macintosh 512K仕様][mac400]（一次） |
| F11 | 1985年9月：規格初版 | 3.5 inch 2DD、ISO Type 301／ECMA-100 | 代表形式 **80×2×9×512＝737,280 B＝720 KiB／枚**。規格内形式の最終照合待ち | 720 KBの普及形式。初版年と個別PCの発売年を分ける。 | [ECMA-100][ecma100]（規格）、[Microsoft：媒体形式][win-media]（一次） |
| F12 | 1986-01-16：Macintosh Plus発売 | 3.5 inch、Mac 800K GCR形式 | 公称 **800K＝819,200 B＝800 KiB／枚**。厳密構成は追加照合 | Macの400K→800K。PCの720Kとは別形式。 | [Apple：Macintosh Plus仕様][mac800]（一次） |
| F13 | 1987年12月：規格初版 | 3.5 inch 2HD、ISO Type 302／ECMA-125 | **80×2×18×512＝1,474,560 B＝1,440 KiB／枚** | いわゆる **1.44 MB**。1.44×1,024×1,000 Bという慣用表示で、1.44 MiBでもない。 | [ECMA-125][ecma125]（規格）、[AT&Tの幾何構成表][att-fd]（一次資料の保存版） |
| F14 | 1990年12月：規格初版 | 3.5 inch 2ED、ISO Type 303／ECMA-147 | 代表形式 **80×2×36×512＝2,949,120 B＝2,880 KiB／枚**。構成は本文再照合待ち | いわゆる2.88 MB。HDの単純な同義語ではない。普及度はHDより限定的。 | [ECMA-147][ecma147]（規格）、[Microsoft：媒体形式][win-media]（一次） |
| F15 | 1994：発表 | Iomega Zip 100 | 公称 **100 MB／枚**。正確なB数は媒体仕様待ち | フロッピーから大容量リムーバブルへの橋渡し。250／750 MBは別世代として追加調査する。 | [CHM：Zipの導入][minifloppy]（研究史） |
| F16 | 1976：発表・出荷 | IBM 43FD、8 inch、両面記録 | 公称 **568 Kbytes／枚**。書式による違い・厳密B数は要照合 | 初代8 inchの80 KBから、書き込み・両面化で増える流れを示す。IBM論文のKbytesは十進／二進を先に仮定しない。 | [IBM：1981年技術史、印刷p.673][ibm-storage-paper]（一次） |
| F17 | 1977：導入 | IBM 53FD、8 inch、MFM高密度記録 | 公称 **1.2 MB級／枚**。書式で容量が変わる | 5.25 inchのPC/AT「1.2 MB」と別媒体・別形式。容量値も同じとは限らない。 | [IBM：1981年技術史、印刷p.673][ibm-storage-paper]（一次）、[CHM：FD史][first-fd]（研究史） |

## 5. 磁気テープ

下表のLTOはすべて **非圧縮のnative容量、1カートリッジ**。圧縮時の200 GB、45 TB、75 TB、100 TBなどを容量比較に使わない。ファイルシステムやLTFSのデータパーティション容量はさらに小さくなる。

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| T01 | 1951：導入 | UNIVAC I用 UNISERVO | 公称 **1,440,000十進桁／巻**。正確な情報bit換算は保留 | **商用計算機向け最初期の磁気テープ装置**。金属テープ。巻長、文字符号、ブロック間ギャップを固定する必要がある。 | [CHM：UNISERVO][tape-first]、[CHM年表][chm-timeline]（研究史） |
| T02 | 1952-05-21：発表、1953：販売 | IBM 726 | 公称 **2,000,000桁／巻**。bit換算は保留 | 真空コラムで高速始動停止。UNISERVOに先行する「世界初の磁気テープ」とは書かない。 | [CHM：テープ][tape-first]、[IBM：磁気テープ史][ibm-tape]（研究史・当事者回顧） |
| T03 | 1984-03-22：一般提供 | IBM 3480 | 公称 **200 MB native／カートリッジ** | 大型オープンリールからカートリッジへの節目。 | [IBM：ライフサイクル][ibm3480-year]、[IBM：仕様一覧][ibm3480-cap]（一次） |
| T04 | 2000：市場導入 | LTO Ultrium 1 | **100 GB native** | 開放的なマルチベンダー形式の普及開始。 | [LTO公式沿革][lto-archive]、[IBM：容量一覧][lto-cap]（一次） |
| T05 | 2002：ライセンス展開、2003：互換認証 | LTO Ultrium 2 | **200 GB native** | 製品の登場年を2002／2003とする資料差を残す。 | [LTO公式沿革][lto-archive]、[IBM：容量一覧][lto-cap]（一次） |
| T06 | 2004：ライセンス・媒体互換認証、2005：普及年表上の導入年 | LTO Ultrium 3 | **400 GB native** | WORMも追加。2004年と2005年の違いは規格／市場導入の出来事の違いとして扱う。 | [LTO公式沿革][lto-archive]、[IBM：容量一覧][lto-cap]、[カナダ保存研究所の年表][lto-years] |
| T07 | 2007：導入 | LTO Ultrium 4 | **800 GB native** | GB級後半の比較候補。 | [IBM：テープ技術年表][ibm-tape-timeline]、[IBM：容量一覧][lto-cap]（一次） |
| T08 | 2010：規格・互換認証 | LTO Ultrium 5 | **1.5 TB native** | TB級、パーティション・LTFSの世代。 | [LTO公式沿革][lto-archive]、[Fujifilm：仕様][lto-fuji]（一次） |
| T09 | 2012：規格・互換認証 | LTO Ultrium 6 | **2.5 TB native** | 圧縮比の宣伝表示は従来と異なるため、nativeで揃える。 | [LTO公式沿革][lto-archive]、[Fujifilm：仕様][lto-fuji]（一次） |
| T10 | 2015：規格公開・互換認証 | LTO Ultrium 7 | **6 TB native** | 大容量化を同じ外形で見せられる。 | [LTO：2015年発表][lto7]、[Fujifilm：仕様][lto-fuji]（一次） |
| T11 | 2017：仕様発表 | LTO Ultrium 8 | **12 TB native** | LTO-7媒体を特定条件で9 TBとして使うType Mとは別の行。 | [LTO：2017年発表][lto8]、[Fujifilm：仕様][lto-fuji]（一次） |
| T12 | 2020：仕様公開、2021：媒体互換認証 | LTO Ultrium 9 | **18 TB native** | 2020年をそのまま一般発売年としない。 | [LTO：2020年発表][lto9]、[公式沿革][lto-archive]、[Fujifilm：仕様][lto-fuji]（一次） |
| T13 | 2025-08-13：仕様公開 | LTO Ultrium 10、30 TB媒体 | **30 TB native** | 仕様公開の年月を採用。IBM等の個別製品の先行提供日は別途調べる。 | [LTO：2025年発表][lto10]（一次） |
| T14 | 2026-01-06：Fujifilm発売告知 | LTO Ultrium 10、40 TB媒体 | **40 TB native** | **同じLTO-10でも30／40 TBを分ける**。100 TBという表示は2.5:1圧縮時。 | [Fujifilm：40 TB発売発表][lto40]（一次）、[LTO：互換性][lto-compat]（規格団体） |

## 6. MO・光ディスク：方式・容量・フォーマット別

DVDの規格制定年は、製品登場の1990年代後半とずれるものがある。まず原典が明確なEcma規格の初版年を採り、製品発売年が重要なものは後から併記する。速度違いだけでは行を増やさず、容量・記録方式・層数・互換性が変わるものを分ける。

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| O01 | 1982-10-01：CDP-101発売 | CD-DA、12 cm、音楽CD | **74分のPCM音声なら783,216,000 B**（44,100×16 bit×2 ch×4,440秒） | 音声用途も含める場合の候補。これは音声ペイロードの計算で、CD-ROMのユーザーデータ容量ではない。全CDが74分固定でもない。 | [Sony：CD開発史][cd-history]（当事者回顧）、[CD-ROM規格][ecma130]（形式の照合先） |
| O02 | 1985：CD-ROM研究発表、1988年7月：ECMA初版 | CD-ROM Mode 1、74分の代表構成 | **333,000 sector×2,048＝681,984,000 B** | 通称650 MBの基準例。データセクタ2,048 Bと生セクタ2,352 Bを分ける。時間からの換算であり、すべてのCD-ROMの固定容量ではない。 | [Sony研究者の1985年論文][cdrom-paper]（一次）、[ECMA-130][ecma130]（規格） |
| O03 | 1988：開発・発表、1989：販売とする史料あり | 太陽誘電 That's CD-R、初期媒体 | 初期製品の **収録時間・B数は要照合** | **最初のCD-R**の候補。後年の700 MB媒体を1988年の容量として置かない。メーカー沿革と科博で製品化年の表現が違う。 | [太陽誘電の沿革][cdr-yuden]（当事者回顧）、[国立科学博物館：現物登録][cdr-kahaku]（所蔵・研究） |
| O04 | 1997：CD-RW生産開始 | CD-RW、初期媒体 | 公称 **650 MB級／枚**。初期型番・時間・B数は要照合 | 追記型CD-Rと書き換え型CD-RWを分ける。 | [Ricoh：沿革][cdrw-ricoh]（当事者回顧）、[NIST：保存ガイド][nist-optical]（公的研究資料） |
| O05 | 1988：製品化 | Sony 5.25 inch MO | 公称 **650 MB／枚** | 初期商用MOの主軸候補。Sony年報はこの寸法の世界初と記すが、MO全般の最初と無限定には書かない。 | [Sony 1991年報][sony-ar1991]（一次） |
| O06 | 1988：発表・展示 | NeXT の5.25 inch MO | 公称 **256 MB／枚** | 同寸法のMOでも容量・形式が異なる例。O05と同じ媒体規格と扱わない。 | [CHM：MO][mo-history]（研究史） |
| O07 | 1991：製品登場、同年6月：ECMA初版 | 3.5 inch MO、128 MB、ISO/IEC 10090 | 公称 **128 MB／枚**、512 B sector | 普及した小型MOの始まり。 | [富士通・Sony：回顧付き発表][gigamo]、[ECMA-154][ecma154]、[富士通：仕様][mo640-spec]（一次・規格） |
| O08 | 1993年12月：ECMA初版 | 3.5 inch MO、230 MB、ISO/IEC 13963 | 公称 **230 MB／枚**、512 B sector | 128 MBとは別規格。1994年はEcma第2版。 | [ECMA-201][ecma201]（規格）、[富士通：仕様][mo640-spec]（一次） |
| O09 | 1997：ISO/IEC 15041、製品の初登場は追加照合 | 3.5 inch MO、540 MB | 公称 **540 MB／枚**、512 B sector | 640 MBと同じ世代でもセクタ長が違う。制定年はISOの版情報を追加確認。 | [富士通：媒体・規格対応表][mo640-spec]（一次）、[Ecma・ISO対応年表][ecma-odc-history]（規格団体） |
| O10 | 1997：ISO/IEC 15041、製品の初登場は追加照合 | 3.5 inch MO、640 MB | 公称 **640 MB／枚**、2,048 B sector | 540 MBと別の行。**HS-1の650 MBを640 MB規格の出典にはしない**。 | [富士通：媒体・規格対応表][mo640-spec]（一次）、[Ecma・ISO対応年表][ecma-odc-history]（規格団体） |
| O11 | 1996年6月：ECMA初版 | 90 mm MO、HS-1形式 | 公称 **650 MB／枚** | O10との混同防止を兼ねた拡張候補。一般的な3.5 inch 640 MB MOと同一ではない。 | [ECMA-239][ecma239]（規格） |
| O12 | 1998-11-05：試作発表、2003年12月：ECMA初版 | 3.5 inch MO、GIGAMO 1.3 GB | 公称 **1.3 GB／枚**、2,048 B sector | 世界初の1.3 GB 3.5 inch MO試作という範囲で記す。1998年を規格の国際標準化年にしない。 | [富士通・Sony：1998年発表][gigamo]、[ECMA-351][ecma351]（一次・規格） |
| O13 | 2001：製品世代、2004年6月：ECMA初版 | 3.5 inch MO、GIGAMO 2.3 GB | 公称 **2.3 GB／枚**、2,048 B sector | 小型MOの到達点候補。製品資料の2001年と、2004年の規格を併記。 | [富士通：2001年仕様][gigamo23]、[ECMA-353][ecma353]（一次・規格） |
| O14 | 1992年12月：ECMA初版 | 130 mm MO、1 GB形式 | 公称 **1 GB／カートリッジ** | 3.5 inch系と別の業務用大径系。容量がディスク両面の合計か、面ごとの値かを採用時に本文照合する。 | [ECMA-183][ecma183]（規格） |
| O15 | 1992年12月：ECMA初版 | 130 mm MO、1.3 GB形式 | 公称 **1.3 GB／カートリッジ** | 3.5 inch GIGAMOの1.3 GBと別形式。 | [ECMA-184][ecma184]（規格） |
| O16 | 1995年6月：確認できた第2版 | 130 mm MO、2 GB形式 | 公称 **2 GB／カートリッジ、1 GB／面** | 初版ファイルが公開されていないため、1995年を初版年とは断定しない。 | [ECMA-195][ecma195]（規格） |
| O17 | 2001年6月：ECMA初版 | 130 mm MO、9.1 GB形式 | 公称 **9.1 GB／カートリッジ、約4.58 GB／面** | 業務用MOの拡張。タイトルの9.1と2×4.58の丸め差を、正確なB数と混同しない。 | [ECMA-322][ecma322]（規格） |
| O18 | 1996年6月：ECMA初版 | PD、120 mm相変化ディスク | 公称 **650 MB／カートリッジ** | MOと見た目が似ていても、記録原理は相変化。CD-RW・DVD-RAMにつなげられる。 | [ECMA-240][ecma240]（規格） |
| O19 | 1997年12月：ECMA初版 | DVD-ROM、DVD-5（片面1層） | 公称 **4.7 GB／枚** | DVDの基本形。正確なデータセクタ数はECMA-267本文で最終照合する。 | [ECMA-267][ecma267]（規格） |
| O20 | 1997年12月：ECMA初版 | DVD-ROM、DVD-9（片面2層） | 公称 **8.5 GB／枚** | 2層化してもDVD-5のちょうど2倍にはならない。 | [ECMA-267][ecma267]（規格） |
| O21 | 1997年12月：ECMA初版 | DVD-ROM、DVD-10（両面1層） | 公称 **9.4 GB／枚、4.7 GB／面** | ディスク1枚の両面合計。裏返しが必要な方式として説明。 | [ECMA-267][ecma267]（規格） |
| O22 | 1997年12月：ECMA初版 | DVD-ROM、DVD-18（両面2層） | 公称 **17 GB／枚** | 「片面2層」と「両面2層」を別に扱う。 | [ECMA-267][ecma267]（規格） |
| O23 | 1998年12月：ECMA初版 | DVD-R、初期3.95 GB形式 | 公称 **3.95 GB／片面、120 mm** | 後の4.7 GB DVD-Rと分ける。80 mm版1.23 GBも存在。 | [ECMA-279][ecma279]（規格） |
| O24 | 2004年12月：ECMA初版 | DVD-R、4.7 GB形式 | 公称 **4.70 GB／片面、120 mm** | これはEcmaでの制定年。4.7 GB製品の最初の発売年ではない。 | [ECMA-359][ecma359]（規格） |
| O25 | 2002年12月：ECMA初版 | DVD-RW、4.7 GB形式 | 公称 **4.70 GB／片面、120 mm** | DVD-Rの書き込み1回と、書き換え型を分ける。 | [ECMA-338][ecma338]（規格） |
| O26 | 2003年12月：ECMA初版 | DVD+R、4.7 GB形式 | **最大2,295,104 sector×2,048＝4,700,372,992 B／片面、120 mm** | DVD-Rとは別規格。ECMA-349初版の13.1節・19節・領域表でデータ領域を照合。これはデータ領域総量で、ファイル用の空き容量ではない。 | [ECMA-349初版PDF][ecma349]（規格） |
| O27 | 2002年12月：ECMA初版 | DVD+RW、4.7 GB形式 | 公称 **4.7 GB／片面、120 mm** | 初期の3.0 GB +RW（ECMA-274）と、普及した4.7 GB形式を区別。 | [ECMA-337][ecma337]（規格） |
| O28 | 1998年2月：ECMA初版 | DVD-RAM、初期世代 | 公称 **2.6 GB／片面、5.2 GB／両面**、120 mm | ランダム書き換え、セクタ管理を持つDVD。第2版のType 1S／2Sの記述で公称容量を確認。後の4.7 GB版と分ける。 | [ECMA-272][ecma272]（規格） |
| O29 | 2001年12月：ECMA初版 | DVD-RAM、4.7 GB世代 | 公称 **4.7 GB／片面、9.4 GB／両面**、120 mm | DVD-RWや+RWと同じ記録方式・互換性ではない。 | [ECMA-330][ecma330]（規格） |
| O30 | 2005年6月：ECMA初版 | DVD+R DL | 公称 **8.55 GB／片面2層、120 mm** | DVD-ROMのDVD-9、DVD-R DLとの違いを残す。 | [ECMA-364][ecma364]（規格） |
| O31 | 2008年6月：ECMA初版 | DVD-R DL | 公称 **8.54 GB／片面2層、120 mm** | DVD+R DLとわずかに容量も異なる。Ecma制定は製品化より後。 | [ECMA-382][ecma382]（規格） |
| O32 | 2002-02-19：基本仕様発表 | 初期Blu-ray Disc基本仕様 | 公称 **23.3／25／27 GB／片面1層** | 最初から25 GBだけだったと単純化しない。初期仕様という候補で、後のBD-ROM・BD-R・BD-REと分ける。 | [9社共同発表／Sony][bd2002]（一次） |
| O33 | 2006年5月：Sony DADC米国生産開始発表 | BD-ROM、25 GB／50 GB形式 | 公称 **25 GB／1層、50 GB／2層** | 2容量を採用する場合は別アイテム。ここでの年は米国量産開始という確認できた出来事で、全Blu-ray製品の世界初ではない。 | [Sony DADC：2006年発表][bd2006]（一次） |
| O34 | 2006年製品世代が候補、初出年は追加照合 | BD-R、25 GB／50 GB | 公称 **25 GB／1層、50 GB／2層** | 1回記録型。容量はメーカー確認済み、正確な初版・初発売はBDA資料で詰める。 | [Sony：媒体容量][bd-capacity]、[BDA：容量][bda-capacity]（一次・規格団体） |
| O35 | 2002年仕様発表以降、初発売年は追加照合 | BD-RE、25 GB／50 GB | 公称 **25 GB／1層、50 GB／2層** | 書き換え型。2003年の23.3 GB初期製品と、後の25 GB形式を混ぜない。 | [2002年基本仕様][bd2002]、[Sony：媒体容量][bd-capacity]（一次） |
| O36 | 2010-06-25：仕様確定 | BDXL、BD-R 100 GB | 公称 **100 GB／3層** | 1回記録型。BDXL非対応ドライブとの互換性に注意。 | [BDA：仕様確定発表][bdxl]（規格団体・一次） |
| O37 | 2010-06-25：仕様確定 | BDXL、BD-RE 100 GB | 公称 **100 GB／3層** | 同容量のBD-Rとは別方式。 | [BDA：仕様確定発表][bdxl]（規格団体・一次） |
| O38 | 2010-06-25：仕様確定 | BDXL、BD-R 128 GB | 公称 **128 GB／4層** | 100 GB版とは層数も異なる。 | [BDA：仕様確定発表][bdxl]（規格団体・一次） |
| O39 | 1994：年報で製品・ファイル形式を紹介 | Sony MD DATA | 公称 **140 MB／枚** | 音楽MDとは別。データ保存用途を主題にできる。1993年発表とする資料もあるため、最初の発表日は要照合。 | [Sony 1994年報][sony-ar1994]（一次） |
| O40 | 2004-01-08：規格発表、同年7月：国内発売告知 | Hi-MD、専用1 GB媒体 | 公称 **1 GB／枚** | 汎用PCデータも記録できるMO系。音楽圧縮による録音時間から容量を逆算しない。 | [Sony：規格発表][himd]、[発売日告知][himd-release]（一次） |
| O41 | 2003年12月：ECMA初版 | UDO 第1世代 | 公称 **30 GB／カートリッジ、15 GB／面** | 業務用相変化光ディスク。MOではない。RW／WORMを別アイテムにする余地あり。 | [ECMA-350][ecma350]（規格） |
| O42 | 2007年12月：ECMA初版 | UDO 第2世代 | 公称 **60 GB／カートリッジ、30 GB／面** | 同外形で容量が増える業務用光記録の候補。 | [ECMA-380][ecma380]（規格） |

## 7. フラッシュカード・持ち歩く半導体ストレージ

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| C01 | 1994：導入 | SanDisk CompactFlash | **容量固定の規格ではない**。初期実製品のSKU・容量は追加調査 | 普及形式として重要。後年の規格上限を1994年の製品容量にしない。 | [CHM：1994年][cf-history]、[CompactFlash Association：形式一覧][cfa]（研究史・規格団体） |
| C02 | 1998-07-30：発表、09-10：発売予定 | Sony Memory Stick MSA-4A | 公称 **4 MB／枚** | 初期製品の型番・容量・発売予定が明確。 | [Sony：発売発表][memorystick]（一次） |
| C03 | 1998-07-30：発表、09-10：発売予定 | Sony Memory Stick MSA-8A | 公称 **8 MB／枚** | 同じ新形式の容量違い。4 MBと8 MBを両方採るかはレビューで判断。 | [Sony：発売発表][memorystick]（一次） |
| C04 | 2000：SD仕様・カード導入 | 初期SDメモリーカード | 公称 **8 MB／枚**が実製品の代表例。型番は追加調査 | **規格上限2 GBと初期製品8 MBを分ける**。1999年の共同発表と2000年の規格・導入を区別する。 | [SD Association：初期カードの説明][sd-initial]、[公式20年史][sd-years]（規格団体） |
| C05 | 2002-08-22：発表、09-06：発売予定 | Olympus xD-Picture Card M-XD16P | 公称 **16 MB／枚** | 薄型のデジタルカメラ向けカード。同時発表の32／64／128 MBも別候補にできる。 | [Olympus：当時の発表][xd]（一次） |
| C06 | 2003年1月：形式発表 | Memory Stick PRO | 公称 **256 MB／512 MB／1 GB／枚** | 旧Memory Stickと別規格。採用容量を選び、製品SKUと一般発売日を固定したい。 | [SanDisk・Sony：共同発表][mspro]（一次） |
| C07 | 2005：規格導入 | microSD | **容量固定の規格ではない**。初期カードの実容量は追加調査 | 外形の小型化の節目。miniSD、TransFlash、microSDを容量上限の変更と混ぜない。 | [SD Association：公式年表][sd-years]（規格団体） |
| C08 | 2006：仕様導入 | SDHC | **2 GB超～32 GBは規格範囲**。32 GB実製品の登場年は別途 | SDとは別の容量クラス。SDHC発表時点で32 GB製品があったという意味ではない。 | [SD Association：容量分類][sd-cap]、[公式年表][sd-years]（規格団体） |
| C09 | 2009／2010：仕様世代 | SDXC | **32 GB超～2 TBは規格範囲**。実製品容量ではない | exFATを使う容量クラス。2 TBカードの初発売は別候補にする。 | [SD Association：容量分類][sd-cap]、[公式年表][sd-years]（規格団体） |
| C10 | 2018／2019：仕様世代 | SDUC | **2 TB超～128 TBは規格範囲**。実製品容量ではない | 128 TBを実在の初期カードとして描かない。面積比較の対象にするなら「規格上限」という明示が必要。 | [SD Association：容量分類][sd-cap]、[公式年表][sd-years]（規格団体） |

## 8. PB級への接続：システム全体の候補

| ID | 年と出来事 | 候補 | 容量・比較単位 | 掲載する意味／注意点 | 根拠 |
| --- | --- | --- | --- | --- | --- |
| X01 | 2026-05-15：システム実現を発表 | Dell PowerEdge R7725xd＋KIOXIA LC9×40 | **245.76 TB×40＝9.8304 PB（公称容量の合計）／2Uサーバー** | 単体媒体の一覧と区別する。発表の「9.8 PB」は丸めで、RAIDやFSを差し引いた実使用容量ではない。PB級を具体的な装置で示す有力候補。 | [KIOXIA・Dell：構成の発表][pb-server]（一次） |

1 PBの目盛そのものを挟むこともできるが、容量単位には「製造年」はない。具体的な記憶装置の項目とは区別する。世界全体の情報量やクラウド全体の推計は、1媒体の容量とは単位が違うので、今回の主一覧には入れない。

## 9. 次の調査で埋めたい候補

ここは採用見送りではなく、年・容量・原典のいずれかがまだ足りない候補。年を空白にせず、現時点での候補年と、何の年かを示す。

| ID | 年の手掛かり | 候補と容量の手掛かり | 追加確認すること | 根拠・調査入口 |
| --- | --- | --- | --- | --- |
| Q01 | 1938／1941：完成期 | Z1の機械式記憶／Z3のリレー記憶。64語×22 bitなら1,408 bit | 原機と後年の復元機で容量が違う。特にDeutsches Museumの復元Z3は32語に削減された記録がある。原機の一次設計資料で固定する。 | [Deutsches Museum：1991年記録][z3]（所蔵機の当事者資料） |
| Q02 | 1939–1942：開発 | Atanasoff–Berry Computer の回転コンデンサ記憶 | 磁気ドラムとは別方式。60語×50 bitという構成の原典と、1939年試作／1942年機の対応を確認する。 | [Iowa State：ABC資料群][abc]（一次資料コレクション） |
| Q03 | 1946：ENIAC完成期 | ENIAC function table等、スイッチによる固定数値記憶 | 広義のROMをどこまで遡るか。単なる制御配線、定数表、プログラム保存を区別し、容量と「最初」の定義を決める。 | [CHM：半導体以前を含む記憶展示][chm-timeline]（追加調査入口） |
| Q04 | 1950年代後半：開発・使用 | Wen Tsing Chow のPROM／constants storage matrix | 1956を特許出願年・発明年のどちらとして扱えるか、実装容量、一次特許とAtlasの設計資料を確認する。1970年のIC PROMとは別。 | [IT History Society：Chow][chow]（研究史） |
| Q05 | 1972／1976–1978：研究 | 初期EAROM／EEPROM、MNOS、薄膜floating gate | 「世界初のEEPROM」は構造・電気消去方式・研究発表・量産で異なる。Intel 2816より前のセル／アレイの容量を論文で確認する。 | [CHM：NVM研究史][nvm]、[IEEE Milestone：1976–78][eeprom-milestone] |
| Q06 | 1993：商用品登場とされる | Ramtron 4 Kbit FRAM | 強誘電体メモリを含めたい。初期型番・4 Kbit構成・初出荷年をRamtron年報やメーカー資料で照合する。 | [Ramtron作成の沿革資料・保存版][fram]（一次資料、該当頁の精査待ち） |
| Q07 | 1990年代～2010年代：製品化 | PCM／PRAM、ReRAM、STT-MRAM、NVDIMM-N | 「最初」の争いを避けて、型番と容量が確かな代表製品を1件ずつ選ぶ。M21のtoggle MRAMとSTT-MRAMは分ける。 | [Everspin：技術論文一覧][everspin-papers]、[Intel：不揮発メモリ系統][xpoint] |
| Q08 | 1981／1983：IBM PC／DOS世代 | 5.25 inchの160／180／320 KB形式 | それぞれ163,840／184,320／327,680 Bという代表構成をIBM Technical ReferenceとDOSの版で照合。F07の360 KBと分ける。 | [Microsoft：媒体形式一覧][win-media]（一次、歴史の初出は別途） |
| Q09 | 1980年代：国内PCで普及 | 5.25／3.5 inch、PC-98系「1 MB／1.2 MB」、1,232 KiB形式 | 77×2×8×1,024＝1,261,568 Bという構成と、NEC／各社の採用年を確認する。PC/ATの1,228,800 Bとは違う。 | [Microsoft：F3_1Pt23_1024等][win-media]（一次、初出年は別途） |
| Q10 | 1990年代：導入 | Zip 250／750、LS-120／240、Floptical、SyQuest、Jaz | 容量違い・方式違いを分け、Iomega／Imation等の原マニュアルと発売発表を探す。 | [CHM：リムーバブル磁気ディスク史][minifloppy]（追加調査入口） |
| Q11 | 1990年代以前～：普及 | 9-track tape、QIC、DDS／DAT、8 mm／Exabyte、DLT／SDLT | 巻長・密度・ブロック長・native容量が分かる特定形式を選ぶ。たとえばDDS-4は1999年ECMA-288、20 GB級。 | [ECMA-288][ecma288]（規格）、[IBM：旧テープ形式][ibm3480-cap]（一次） |
| Q12 | 1995／1997：導入とされる | SmartMedia／MultiMediaCard | 初期SKU・実容量・公式導入年を確認する。容量上限と初期実製品を混ぜない。 | [国立科学博物館：デジタルカメラ史][camera-kahaku]（研究史） |
| Q13 | 2000：製品登場 | USB flash drive、Trek ThumbDrive／M-Systems・IBM DiskOnKey | 「世界初」の定義・販売地域・発売日が競合する。8 MB級という初期容量も当時のメーカー発表で固定したい。 | [Trek：ThumbDrive][trek]（メーカー、歴史資料は追加探索）、[CHM：SSD史][ssd-history] |
| Q14 | 2006：製品導入期 | HD DVD-ROM／HD DVD-R／HD DVD-RW | 15／30 GBという代表容量、層数、初出規格・発売年をDVD Forumの一次資料で確認。普及しなかった方式も比較対象として価値がある。 | [NIST：光媒体保存資料][nist-optical]は基礎知識のみ。HD DVDの直接根拠は未収集。 |
| Q15 | 2007年5月：規格制定 | HVD、HVD-ROM | **HVD記録型200 GB／HVD-ROM 100 GB（規格の公称）**。量産・普及した実媒体の容量とは限らない。 | [ECMA-377][ecma377]、[ECMA-378][ecma378]（規格） |
| Q16 | 2010年代～：研究発表 | ガラス記録、DNA記録など | 「360 TB／ディスク」等の理論上限と、実際に記録・復号したデータ量を分ける。原論文で実証容量が確認できるまで面積比較に使わない。 | 今回は個別論文の収集前。次回調査枠として残す。 |

Q16の360 TBは調査対象の言説の例であり、この調査で確認済みの研究成果として挙げた数値ではない。

## 10. 「世界初」と容量の照合メモ

### ROMは一つの「世界初」にまとめない

Sylvaniaの1965年256-bit ROMは、半導体ROM ICの初期例として有力。固定スイッチやダイオードマトリクス、コアロープ等を含む読み出し専用記憶全体の発明年を意味しない。初期画面では「初期の半導体ROM」、解説では「何を世界初と呼ぶか」を扱うのがよい。PROM、EPROM、EEPROM、NOR flash、NAND flashもそれぞれ別項目にする。[CHM：ROM][rom]、[NVM研究史][nvm]

### RAMACは「5 MB」ではなく情報の符号まで見る

CHMの記述は500万文字・1文字6情報bitで3.75 MB相当。IBMの現行回顧ページには7 bit／文字や5 MB等の表現もあり、資料の肩書きだけでは揃わない。サイトの比較は情報bitを採り、parityを除いた30,000,000 bitを候補にする。最終文言には原マニュアルまたは当時の論文を追加したい。[CHM][ramac]、[IBM][ibm-ramac]

### パンチカードは穴の場所の数と文字容量が違う

80文字、960の穿孔位置、1文字を何bitで表すか、という別の数がある。「80 B」なら8-bit文字への換算、「960 bit」なら全穿孔位置を独立に使えるというモデルである。歴史的な符号の制約と実際の読取方式を決めずにどちらかを確定値にしない。[IBM：パンチカード][ibm-card]

### EDSACは短語・長語・パディング・増設を分ける

Cambridgeの統計は最終的な1,024個の17-bit短語を示し、2つの512語バンクを記す。初期ログの16本×16長語×35 bitと、1長語＝17 bit＋padding＋17 bitという説明を合わせると、初期の情報量として512×17＝8,704 bitが候補になる。CHMの512×35という記述は異なる構成時点の可能性があり、初期／増設後を特定してから確定する。[Cambridge：統計][edsac-stat]、[初期ログ][edsac-log]、[語の説明][edsac-poster]、[CHM：遅延線][edsac-chm]

### 「1.2 MB」は「1.2 MiB」に直せば解決、ではない

PC/ATの5.25 inch形式なら1,228,800 B＝1,200 KiB＝1.171875 MiB。3.5 inchの「1.44 MB」は1,474,560 B＝1,440 KiB＝1.40625 MiB。PC-98系の候補は1,261,568 Bで、そもそも別形式である。ラベルは当時の名前を残し、本文に正確な値を書く方が分かりやすい。[IBMのサービス資料][ibm12-manual]、[AT&T][att-fd]、[Microsoft][win-media]

また、F03の256,256 Bは互換形式の全トラックのデータフィールドを合算した値で、IBM 33FDの製品資料に出る約243 Kbytesと同じ集計範囲ではない。歴史的な実製品そのものを描く場合は、管理・予備トラックを除いた装置の形式別容量を原マニュアルで確認し、全トラックの幾何容量で代用しない。[互換機の仕様][ibm3740-format]、[IBM技術史][ibm-storage-paper]

### CD・DVD・MOは「同じ公称容量＝同じ正確なB数」としない

CDは収録時間とセクタのモードで有効データ量が変わる。DVD±Rは共に4.7 GBと呼ばれても同じセクタ数とは限らない。MOでは予備領域やセクタサイズによる差もある。初期調査では公称値を残し、実装に移す際に規格のdata field／user data sector数を照合する。規格上の最大容量、ホストが見える総セクタ、フォーマット後の空き領域を同じ列に混ぜない。[ECMA-130][ecma130]、[DVD-R][ecma359]、[DVD+R DL][ecma364]、[MO仕様][mo640-spec]

### 年代順と容量順は一致しない

1969年の64-bit SRAMは、1956年のHDDよりはるかに小さい。サイトは**容量順の一本の流れ＋各アイテムの年表示**にする方針が決定した。年代の前後は許容し、容量順で歴史的な変化をたどる。この調査一覧は原典を分野別にレビューしやすいよう年代順を維持するが、サイトの掲載順を意味しない。

## 11. 最初の採用レビュー案

すべてを同時に実装せず、まずは次のまとまりで選ぶと、単位・方式・歴史の偏りを確認しやすい。

- **歴史の柱**：A02・A03（カード）、M03（Baby）、M04（遅延線）、M05（コア）、M08（半導体ROM）、M13・M14（SRAM／DRAM）、M16・M18・M20（EPROM／EEPROM／NAND）。未確定の容量は先に照合する。
- **世界初と装置の変化**：D02（最初のHDD）、F01（最初のFDD）、F04（5.25 inch FDD）、F09（3.5 inch FD）、D08（3.5 inch HDD）、D09（2.5 inch HDD）、D05・D10（RAM SSD／flash SSD）。
- **触れた人が多い媒体**：F03・F08・F10・F11・F12・F13（FD形式）、F15（Zip）、O02（CD-ROM）、O03・O04（CD-R／RW）、O07～O10・O12・O13（小型MO）。
- **規格の違いを見せる**：O19～O31（DVDの方式・層数）、O33～O38（Blu-rayの方式・層数）。「容量が同じ項目も別に扱う」という今回の要望に対応する。
- **大容量への到達**：D12（1 TB HDD）、T04・T08・T12・T14（LTOの代表世代）、D13・D15（大容量SSD）、X01（PB級のシステム）。
- **携帯性の変化**：C02（Memory Stick）、C04（初期SD）、C05（xD）、C07（microSD）。規格上限のC08～C10は実製品との混同を避け、補足欄に置く案。

レビュー時に決めたいこと：

- [ ] 広義の前史（織機）を含めるか。カードの比較値を文字の情報量にするか、穿孔可能位置にするか。
- [ ] メモリは1チップ、コアは1面、SSDは1台という比較単位の変化をどう表示するか。
- [ ] 同容量の異方式・規格を同じ段階にまとめるか、独立したアイテムとして連続表示するか。
- [ ] 年表示の基本を製品登場年に置き、規格制定年は補記するか。まず規格の年で載せて追加調査するか。
- [ ] 公称容量だけ確認できた項目の、正確なB数を確定してから実装するか。
- [ ] 規格上限・試作・研究段階の項目を本編に含めるか。実際に販売・使用された装置を本編の主軸にするか。
- [ ] PBに到達する際に、単体装置から複数媒体のシステムへ比較単位が変わることをどう伝えるか。

## 出典リンク

各行のリンクは以下の同一URLを参照する。PDFは資料内の作成年と、Web上のアップロード年・検索エンジンの日付を区別して読む。今回はWikipediaを根拠には使っていない。検索で見つからなかったことを、先行例が存在しない証拠とは扱わない。

[jacquard]: https://www.computerhistory.org/storageengine/punched-cards-control-jacquard-loom/
[census]: https://www.census.gov/programs-surveys/decennial-census/decade/1890/about-1890.html
[smithsonian-card]: https://www.si.edu/spotlight/punch-cards/punch-cards-data-processing
[ibm-card]: https://www.ibm.com/history/punched-card
[baby]: https://curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/new.baby.html
[crt]: https://www.computerhistory.org/storageengine/williams-demonstrates-crt-storage/
[edsac-simulator]: https://www.cl.cam.ac.uk/~mr10/Edsac.html
[edsac-stat]: https://www.cl.cam.ac.uk/events/EDSAC99/statistics.html
[edsac-log]: https://www.cl.cam.ac.uk/relics/elog.html
[edsac-poster]: https://www.cl.cam.ac.uk/~mr10/Edsac/edsacposter.pdf
[edsac-chm]: https://www.computerhistory.org/storageengine/edsac-computer-employs-delay-line-storage/
[core]: https://www.computerhistory.org/storageengine/whirlwind-computer-debuts-core-memory/
[core-onr]: https://bitsavers.computerhistory.org/pdf/onr/Digital_Computer_Newsletter/Digital_Computer_Newsletter_V13N04_Oct61-Apr62.pdf
[thin-film]: https://www.computerhistory.org/storageengine/thin-film-memory-commercially-available/
[dram]: https://www.computerhistory.org/siliconengine/mos-dynamic-ram-competes-with-magnetic-core-memory-on-price/
[rom]: https://www.computerhistory.org/siliconengine/semiconductor-read-only-memory-chips-appear/
[apollo-design]: https://ntrs.nasa.gov/api/citations/19660019469/downloads/19660019469.pdf
[intel-3101]: https://www.intel.com/content/www/us/en/history/virtual-vault/articles/intels-first-product-3101.html
[edn-1103]: https://bitsavers.computerhistory.org/magazines/EDN/EDN_EEE_V18_N12_197012.pdf
[eprom]: https://www.computerhistory.org/siliconengine/reusable-programmable-rom-introduces-iterative-design-flexibility/
[bubble]: https://timeline.intel.com/1979/the-7110
[bubble-1979]: https://bitsavers.computerhistory.org/magazines/Datamation/197906.pdf
[intel-memory-book]: https://www.bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf
[intel-ar1984]: https://www.intel.com/content/dam/www/central-libraries/us/en/documents/2025-05/history-1984-annual-report.pdf
[flash-oral]: https://archive.computerhistory.org/resources/access/text/2012/04/102658199-05-01-acc.pdf
[kioxia-history]: https://www.kioxia.com/ja-jp/rd/technology/history.html
[mram]: https://www.everspin.com/sites/default/files/Hulett%20Supper%20Club%202015_08_13.pdf
[vnand]: https://semiconductor.samsung.com/news-events/news/samsung-electronics-takes-3d-memory-to-new-heights-with-sixth-generation-v-nand-ssds-for-client-computing/
[bics256]: https://www.kioxia.com/ja-jp/about/news/2015/20150804-1.html
[xpoint]: https://www.intc.com/news-events/press-releases/detail/324/intel-and-micron-produce-breakthrough-memory-technology
[optane]: https://www.intel.com/content/www/us/en/developer/articles/news/second-generation-intel-xeon-processor-scalable-family-technical-overview.html
[optane-lenovo]: https://lenovopress.lenovo.com/lp1066-intel-optane-persistent-memory-100-series
[ddr5]: https://news.skhynix.com/en/sk-hynix-inc-announces-1ynm-16gb-ddr5-dram-2/
[hbm2e]: https://news.skhynix.com/en/sk-hynix-develops-worlds-fastest-high-bandwidth-memory-hbm2e/
[drum]: https://www.computerhistory.org/storageengine/tauschek-patents-magnetic-drum-storage/
[ramac]: https://www.computerhistory.org/storageengine/first-commercial-hard-disk-drive-shipped/
[ibm-ramac]: https://www.ibm.com/history/ramac
[disk-pack]: https://www.computerhistory.org/storageengine/disk-packs-offer-portability-security/
[winchester]: https://www.computerhistory.org/storageengine/winchester-pioneers-key-hdd-technology/
[ssd-history]: https://www.computerhistory.org/storageengine/solid-state-drive-module-demonstrated/
[st506]: https://s3.computerhistory.org/groups/ds-seagate-st-506.pdf
[ibm3380-manual]: https://bitsavers.trailing-edge.com/pdf/ibm/dasd/3380/GA26-1664-3_3380_Description_and_Users_Guide_198412.pdf
[rodime]: https://s3.computerhistory.org/groups/rodime-ro352.pdf
[mini-hdd]: https://www.computerhistory.org/storageengine/miniature-disk-drives-enable-mobile-computing/
[harari-ssd]: https://ethw-images.s3.us-east-va.perf.cloud.ovh.us/ethw/2/29/Ref7-IMW-2011.pdf
[hitachi-1tb]: https://www.hitachi.com/en-us/press/archive/01052007/
[samsung-1536]: https://news.samsung.com/us/samsung-introduces-worlds-largest-capacity-15-36tb-ssd-enterprise-storage-systems/
[hamr]: https://www.seagate.com/stories/articles/seagates-breakthrough-30tb-plus-hard-drives-ramp-volume-marking-an-inflection-point-in-the-storage-industry-pr/
[lc9]: https://www.kioxia.com/ja-jp/business/news/2025/20250722-1.html
[pb-server]: https://www.kioxia.com/ja-jp/business/news/2026/20260515-1.html
[first-fd]: https://www.computerhistory.org/storageengine/floppy-disk-loads-mainframe-computer-data/
[ibm-fd]: https://www.ibm.com/history/floppy-disk
[ibm3740-format]: https://bitsavers.org/pdf/icom/SDC_FDS-2_Manual.pdf
[ibm-storage-paper]: https://www.bitsavers.org/pdf/ibm/IBM_Journal_of_Research_and_Development/255/ibmrd2505ZB.pdf
[minifloppy]: https://www.computerhistory.org/storageengine/minicomputers-stimulate-floppy-disk-sales/
[sa400-1976]: https://vintageapple.org/byte/pdf/197612_Byte_Magazine_Vol_00-16_Machine_Readable_Print.pdf
[disk2-13]: https://archive.computerhistory.org/resources/access/text/2016/06/102725167-05-01-acc.pdf
[win-media]: https://learn.microsoft.com/windows/win32/api/winioctl/ne-winioctl-media_type
[ibm12-manual]: https://www.manualslib.com/manual/1015063/Ibm-6151.html?page=511
[sony-fd]: https://www.sony.jp/rec-media/info/20100423.html
[mac400]: https://support.apple.com/en-us/112187
[mac800]: https://support.apple.com/en-ae/112183
[att-fd]: https://www.bitsavers.org/pdf/att/unix/System_V_386_Release_4/0-13-957481-6_Unix_System_V_386_Release_4_Multibus_Reference_1990.pdf
[tape-first]: https://www.computerhistory.org/storageengine/tape-unit-developed-for-data-storage/
[ibm-tape]: https://www.ibm.com/history/magnetic-tape
[ibm3480-year]: https://www.ibm.com/support/pages/node/7093315
[ibm3480-cap]: https://www.ibm.com/support/pages/node/641919
[lto-archive]: https://www.lto.org/pr-archive/
[lto-cap]: https://www.ibm.com/docs/en/t-tt-and-t?topic=media-data-cartridges
[lto-years]: https://www.canada.ca/en/conservation-institute/services/conservation-preservation-publications/technical-bulletins/digitization-vhs-video-tapes.html
[ibm-tape-timeline]: https://www.ibm.com/support/pages/system/files/inline-files/WSCAccelerateTape101-9-27-18.pdf
[lto-fuji]: https://www.fujifilm.com/in/en/business/data-management/datastorage/ltotape/specifications
[lto7]: https://www.lto.org/wp-content/uploads/2021/09/THE-LTO-PROGRAM-ANNOUNCES-UPCOMING-GENERATION-7-SPECIFICATIONS-FOR-LICENSING.pdf
[lto8]: https://www.lto.org/wp-content/uploads/2021/09/LTO-PROGRAM-OUTLINES-GENERATION-8-SPECIFICATIONS-AND-EXTENDS-TECHNOLOGY-ROADMAP-TO-12TH-GENERATION.pdf
[lto9]: https://www.lto.org/2020/09/the-lto-program-releases-specifications-for-upcoming-generation-9/
[lto10]: https://www.lto.org/2025/08/the-lto-program-introduces-generation-10-of-leading-tape-technology-delivering-unparalled-media-density/
[lto40]: https://www.fujifilm.com/in/en/news/fujifilm-expands-lto-portfolio-with-lto-10-40tb
[lto-compat]: https://www.lto.org/lto-generation-compatibility/
[cd-history]: https://www.sony.com/en/SonyInfo/CorporateInfo/History/SonyHistory/2-07.html
[cdrom-paper]: https://opg.optica.org/abstract.cfm?uri=ODS-1985-WCC1
[cdr-yuden]: https://www.yuden.co.jp/en/company/history/
[cdr-kahaku]: https://sts.kahaku.go.jp/english/material/2021pdf/noe322.pdf
[cdrw-ricoh]: https://www.ricoh.com/about/history/1985_1999
[nist-optical]: https://www.nist.gov/publications/care-and-handling-preservation-cds-and-dvds-guide-librarians-and-archivists
[sony-ar1991]: https://www.sony.com/en/SonyInfo/IR/library/ar/8ido18000005flxn-att/1991-E.pdf
[mo-history]: https://www.computerhistory.org/storageengine/magneto-optical-storage-demonstrated/
[gigamo]: https://info.archives.global.fujitsu/jp/news/1998/Nov/5-e.html
[mo640-spec]: https://www.fujitsu.com/downloads/HK/mce_mcf3064ss.pdf
[gigamo23]: https://www.fujitsu.com/downloads/HK/mcj3230ss.pdf
[ecma-odc-history]: https://dev.ecma-international.org/wp-content/uploads/Standardization-of-ODCs-3.pdf
[bd2002]: https://www.sony.com/en/SonyInfo/News/Press/200202/02-0219E/
[bd2006]: https://www.sony.com/SonyInfo/IR/news/20060516.pdf
[bd-capacity]: https://www.sony.com/electronics/support/audio-video-accessories-other-av-accessories/dlc-hd50g/articles/00029645
[bda-capacity]: https://us.blu-raydisc.com/blog/hd_benefits/capacity/
[bdxl]: https://us.blu-raydisc.com/wp-content/uploads/sites/2/2019/09/20100628-BDXL-Specification-Approved.pdf
[sony-ar1994]: https://www.sony.com/en/SonyInfo/IR/library/ar/1994-E.pdf
[himd]: https://www.sony.com/ja/SonyInfo/News/Press/200401/04-001/
[himd-release]: https://www.sony.jp/CorporateCruise/Press/200405/05-0526/
[cf-history]: https://www.computerhistory.org/timeline/1994/
[cfa]: https://compactflash.org/card-types/
[memorystick]: https://www.sony.com/en/SonyInfo/News/Press/199807/98-067/
[sd-initial]: https://www.sdcard.org/press/thoughtleadership/anatomy-of-an-sd-memory-card-what-matters-most-for-photography-and-videography/
[sd-years]: https://www.sdcard.org/pdf/SDA20thAnniversary_Infographic.pdf
[sd-cap]: https://www.sdcard.org/developers/sd-standard-overview/capacity-sd-sdhc-sdxc-sduc/
[xd]: https://www.olympus.co.jp/jp/news/2002b/nr020822xdcardj.html
[mspro]: https://www.sony.com/en/SonyInfo/News/Press/200301/03-0110bE/
[chm-timeline]: https://www.computerhistory.org/timeline/memory-storage/
[z3]: https://www.deutsches-museum.de/assets/Verlag/Download/Kultur_und_Technik/1991/Kultur_Technik_1991_Heft3.pdf
[abc]: https://digitalcollections.lib.iastate.edu/atanasoff/
[chow]: https://ithistory.org/honoree/wen-tsing-chow
[nvm]: https://computerhistory.org/blog/pioneers-of-semiconductor-non-volatile-memory-nvm-the-first-four-decades/
[eeprom-milestone]: https://ethw.org/Milestones:The_Floating_Gate_EEPROM,_1976_-_1978
[fram]: https://www.cika.com/soporte/Information/Ramtron/PocketSalesSupport.pdf
[everspin-papers]: https://legacy.everspin.com/technical-papers
[camera-kahaku]: https://sts.kahaku.go.jp/diversity/document/system/pdf/039_e.pdf
[trek]: https://www.trek2000.com.sg/pages/thumbdrive%C2%AE-storage-solutions
[ecma54]: https://ecma-international.org/publications-and-standards/standards/ecma-54/
[ecma70]: https://ecma-international.org/publications-and-standards/standards/ecma-70/
[ecma99]: https://ecma-international.org/publications-and-standards/standards/ecma-99/
[ecma100]: https://ecma-international.org/publications-and-standards/standards/ecma-100/
[ecma125]: https://ecma-international.org/publications-and-standards/standards/ecma-125/
[ecma147]: https://ecma-international.org/publications-and-standards/standards/ecma-147/
[ecma130]: https://ecma-international.org/publications-and-standards/standards/ecma-130/
[ecma154]: https://ecma-international.org/publications-and-standards/standards/ecma-154/
[ecma201]: https://ecma-international.org/publications-and-standards/standards/ecma-201/
[ecma239]: https://ecma-international.org/publications-and-standards/standards/ecma-239/
[ecma351]: https://ecma-international.org/publications-and-standards/standards/ecma-351/
[ecma353]: https://ecma-international.org/publications-and-standards/standards/ecma-353/
[ecma183]: https://ecma-international.org/publications-and-standards/standards/ecma-183/
[ecma184]: https://ecma-international.org/publications-and-standards/standards/ecma-184/
[ecma195]: https://ecma-international.org/publications-and-standards/standards/ecma-195/
[ecma322]: https://ecma-international.org/publications-and-standards/standards/ecma-322/
[ecma240]: https://ecma-international.org/publications-and-standards/standards/ecma-240/
[ecma267]: https://ecma-international.org/publications-and-standards/standards/ecma-267/
[ecma279]: https://ecma-international.org/publications-and-standards/standards/ecma-279/
[ecma359]: https://ecma-international.org/publications-and-standards/standards/ecma-359/
[ecma338]: https://ecma-international.org/publications-and-standards/standards/ecma-338/
[ecma337]: https://ecma-international.org/publications-and-standards/standards/ecma-337/
[ecma349]: https://www.ecma-international.org/wp-content/uploads/ECMA-349_1st_edition_december_2003.pdf
[ecma272]: https://ecma-international.org/publications-and-standards/standards/ecma-272/
[ecma330]: https://ecma-international.org/publications-and-standards/standards/ecma-330/
[ecma364]: https://ecma-international.org/publications-and-standards/standards/ecma-364/
[ecma382]: https://ecma-international.org/publications-and-standards/standards/ecma-382/
[ecma350]: https://ecma-international.org/publications-and-standards/standards/ecma-350/
[ecma380]: https://ecma-international.org/publications-and-standards/standards/ecma-380/
[ecma288]: https://ecma-international.org/publications-and-standards/standards/ecma-288/
[ecma377]: https://ecma-international.org/publications-and-standards/standards/ecma-377/
[ecma378]: https://ecma-international.org/publications-and-standards/standards/ecma-378/
