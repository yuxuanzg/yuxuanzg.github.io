<!--
  示例/模板文章
  ============================================================
  发布新文章步骤：
  1. 复制本文件，重命名为英文名，如 my-first-note.md
  2. 修改下面 --- 之间的元信息（title_zh/title_en/date/intro_zh/intro_en/tags）
  3. 用 Markdown 写正文（支持 # 标题、列表、表格、代码、$公式$）
  4. 在 blog/list.json 的 "posts" 数组中复制一条记录，改成你的标题/简介/文件名
  5. 双击 deploy.bat 上线
  ============================================================
-->
---
title_zh: 非厄米物理学习笔记：非布洛赫能带
title_en: Notes on Non-Hermitian Physics: Non-Bloch Bands
date: 2025-01-15
intro_zh: 整理非布洛赫带理论、广义布里渊区与开放量子系统的一篇入门笔记。
intro_en: An introductory note on non-Bloch band theory, the generalized Brillouin zone, and open quantum systems.
tags: [非厄米物理, 量子开放系统, 拓扑物态]
---

# 引言

真实的物理系统几乎总是与外界环境耦合：耗散、增益与驱动无处不在。将系统与环境的相互作用有效纳入描述，就得到**非厄米哈密顿量**或开放量子系统的演化方程。近年来的研究表明，非厄米体系拥有厄米体系所没有的新奇现象，比如例外点与谱奇异。

> 学习建议：先用一维模型动手画出能带，再逐步引入 Berry 相与拓扑不变量，理解会更扎实。

## 例外点与谱奇异

非厄米算符的本征值与本征矢不必解析地依赖参数：在参数空间的某些点，多个本征值与对应本征矢同时合并，这些点称为**例外点**（exceptional point, EP）。在 EP 附近，能级呈现平方根标度的劈裂，这与厄米体系中的能级避免交叉截然不同。

以两能级非厄米哈密顿量为例：

$$
\hat{H} = \begin{pmatrix} \epsilon & g \\ g & -\epsilon \end{pmatrix} + i\gamma \hat{\sigma}_z
$$

其本征值为：

$$
E_\pm = \pm \sqrt{\epsilon^2 + g^2 - \gamma^2}
$$

当 $\epsilon^2 + g^2 = \gamma^2$ 时两个本征值合并，系统处于例外点。

## 非布洛赫能带理论与广义布里渊区

在开边界条件下，非厄米体系的体态并不由标准的布洛赫能带完全刻画，需要考虑**广义布里渊区**（GBZ）与非布洛赫能带理论，由此可以恢复非厄米体系的体-边对应关系。

一维紧束缚模型示例：

```python
import numpy as np

def non_bloch_spectrum(L, t1, t2, gamma):
    """开边界下非厄米 SSH 模型的能谱（示意）"""
    H = np.zeros((L, L), dtype=complex)
    for j in range(L - 1):
        H[j, j+1] = t1 + t2        # 右向跃迁
        H[j+1, j] = t1 - t2        # 左向跃迁
        H[j, j] = 1j * gamma       # 增益/耗散（示意）
    return np.linalg.eigvalsh(H)

E = non_bloch_spectrum(80, 1.0, 0.3, 0.2)
```

## 开放量子系统：Lindblad 方程

当关注系统约化密度矩阵的演化时，在马尔可夫近似下可以得到 Lindblad 主方程：

$$
\frac{d\rho}{dt} = -i[H, \rho] + \sum_k \gamma_k \left( L_k \rho L_k^\dagger - \frac{1}{2}\{L_k^\dagger L_k, \rho\} \right)
$$

其中 $L_k$ 为跳跃算符（Lindblad operators），$\gamma_k$ 为对应耗散率。

## 小结表格

| 概念 | 厄米体系 | 非厄米体系 |
| --- | --- | --- |
| 能级靠近 | 避免交叉 | 例外点（EP）合并 |
| 体-边对应 | 布洛赫能带 | 广义布里渊区（GBZ） |
| 本征矢 | 正交 | 一般不正交 |

## 参考资料

- *Non-Hermitian physics*（综述）
- *Exceptional topology of non-Hermitian systems*
- *Non-Bloch Band Theory of Non-Hermitian Systems*
- 《广义布里渊区与非厄米能带》（中文综述）
- *A short introduction to the Lindblad master equation*
- *Keldysh field theory for driven open quantum systems*
