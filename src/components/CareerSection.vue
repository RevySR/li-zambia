<template>
  <section id="career">
    <div class="sec-head">
      <span class="sec-num">一</span>
      <h2>升迁履历</h2>
      <span class="sub">Record of Service</span>
    </div>
    <p class="sec-intro">技术履历每一条都能在 GitHub 上查到；而他的官阶晋升史，则是一部让真正的部委领导都陷入沉思的民间传奇。</p>

    <aside class="anecdote" aria-label="名号考据：为什么叫李部长">
      <div class="anecdote-kicker">TITLE LORE · 为什么叫「李部长」？</div>
      <h3>从「李处长」到「李部长」：一次把真·副部长看破防的口头提拔</h3>
      <p class="anecdote-copy">
        最早大家叫他<strong>「李处长」</strong>。后来朋友们觉得处级干部已经配不上他的气场，打趣间直接给他口头扶正，改叫<strong>「李部长」</strong>。结果有一回被一位真正的<strong>工信部副部长</strong>看见，当场发出了来自体制内的灵魂感慨：
      </p>
      <blockquote class="anecdote-quote">
        <p>“年纪轻轻就当上部长了，我爬了半辈子才是个副部。”</p>
        <cite>—— 某位工信部副部长</cite>
      </blockquote>
      <div class="anecdote-ranks">
        <div>
          <span class="step">STAGE 01 · 基层起步</span>
          <strong>李处长</strong>
          <span>早期尊称。听着像管公章和发茶叶的，实际管的是分支合并与社区杂务。</span>
        </div>
        <div>
          <span class="step">STAGE 02 · 群众口头扶正</span>
          <strong>李部长</strong>
          <span>朋友们打趣起哄直接提拔为正部级。没有红头文件，但叫的人多了，连真副部长都信了。</span>
        </div>
        <div>
          <span class="step">STAGE 03 · 跳出行政序列</span>
          <strong>赞比亚李酋长</strong>
          <span>国内官阶已经封顶，再升容易引起部委误会，索性外派非洲铜带省，改走部落世袭制。</span>
        </div>
      </div>
    </aside>

    <div class="timeline">
      <article class="entry">
        <div class="when">社区治理</div>
        <div>
          <h3>FlagOS 的流程、规范与 PR 归属</h3>
          <p>在 <a class="repo" href="https://github.com/shiptux/community" target="_blank" rel="noopener">shiptux/community</a> 里维护 FlagOS 的社区治理规则、开发者贡献指南和贡献协议。管流程、管人、管 PR 该谁看——名号从「李处长」被朋友们叫成了「李部长」，部长的活儿还真没少干。</p>
          <span class="tag fact">社区治理 · 有据可查</span>
        </div>
      </article>
      <article class="entry">
        <div class="when">技术底账</div>
        <div>
          <h3>把 DynamoRIO 搬到 RISC-V</h3>
          <p><a class="repo" href="https://github.com/shiptux/dynamorio-riscv-port-memo" target="_blank" rel="noopener">dynamorio-riscv-port-memo</a> 记着移植路上的坑；<a class="repo" href="https://github.com/shiptux/tarsier-monthly" target="_blank" rel="noopener">tarsier-monthly</a> 则按月汇报 RISC-V 操作系统的进展。一个人撑起一条移植线和一份月报。</p>
          <span class="tag fact">有据可查</span>
        </div>
      </article>
      <article class="entry">
        <div class="when">基本功</div>
        <div>
          <h3>用内核模块说了声 hello</h3>
          <p><a class="repo" href="https://github.com/shiptux/hello_ko" target="_blank" rel="noopener">hello_ko</a>：不满足于用户态的那句 hello world，写成了内核模块。加载、打印、卸载，三行日志。</p>
          <span class="tag fact">有据可查</span>
        </div>
      </article>
      <article class="entry">
        <div class="when">搬家</div>
        <div>
          <h3>把家当搬进 git</h3>
          <p><a class="repo" href="https://github.com/shiptux/dotfiles" target="_blank" rel="noopener">dotfiles</a>：终端配置、编辑器配置、别名，全部版本化。换机器只需要一条命令，去非洲也一样。</p>
          <span class="tag fact">有据可查</span>
        </div>
      </article>
      <article class="entry">
        <div class="when">2026</div>
        <div>
          <h3>赴任赞比亚，升任酋长</h3>
          <p>收拾行李，飞往卢萨卡。头衔从部长升到酋长，办公桌从工位换成部落。工作内容没变：还是开源，还是社区，还是要盯 PR 有没有人 review。</p>
          <span class="tag">民间称号</span>
        </div>
      </article>
    </div>
  </section>
</template>
