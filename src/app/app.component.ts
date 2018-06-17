import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OrderedList, SelectionEditor, UnorderedList} from './selection';
import {QuillService} from './quill-service/quill.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  public editor: SelectionEditor = new SelectionEditor();
  public safeHtml;

  constructor(private quillService: QuillService,
              private sanitaizer: DomSanitizer,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.safeHtml = this.sanitaizer.bypassSecurityTrustHtml(this.html);
    this.quillService.selected$.subscribe(editor => {
      this.editor = editor;
      this.cd.detectChanges();
    });

  }

  insert() {
  }

  public bold() {
    this.quillService.setBold(!this.editor.bold.active);
  }


  public italic() {
    this.quillService.setItalic(!this.editor.italic.active);
  }

  public link() {
    let url = '';
    if (!this.editor.link.active) {
      url = 'https://goodgame.ru';
    }
    this.quillService.setLink(url);
  }

  public delete() {
    this.quillService.setDelete(!this.editor.del.active);
  }


  public ins() {
    this.quillService.setIns(!this.editor.ins.active);
  }

  public bloquote() {
    this.quillService.setBloquote(!this.editor.blockquote.active);
  }

  public divider() {
    this.quillService.appendDivider();
  }

  public spoiler() {
    this.quillService.appendSpoiler();
  }

  public orderedList() {
    this.quillService.list(this.editor.orderedList.active ? undefined : OrderedList.formatType);
  }

  public unorderedList() {
    this.quillService.list(this.editor.unorderedList.active ? undefined : UnorderedList.formatType);
  }

  public header(level: number) {
    this.quillService.setHeader(level);
  }

  public img() {
    const src = 'https://pp.userapi.com/c5661/u89683801/152004832/x_bc58fc33.jpg';
    this.quillService.appendImg(src);
  }

  public cite() {
    const src = 'https://goodgame.ru/';
    this.quillService.appendCite(src);
  }

  public ngAfterViewInit() {
    this.quillService.init();
    const delta = this.quillService.convertHTML(this.html);
    console.log(delta);
    // this.quillService.pasteHTML(this.html);
    this.quillService.setContent(delta);
  }

  tag: any = '<p>111111123123123123</p>';
  html: any = `
  <h1>h1 Съешь как еще этих вкусных французских булок, дружок-пирожок</h1>
  <h2>h2 Съешь как еще этих вкусных французских булок, дружок-пирожок</h2>
  <h3>h3 Съешь как еще этих вкусных французских булок, дружок-пирожок</h3>
  <p>обычный p с a внутри Lorem <a href="#">this is link</a></p>
  <gg-spoiler title="Спойлер.Очень длинный заголовок спойлера очень длинный заголовок спойлера очень…" content="${this.tag}"
        active="true"></gg-spoiler>

  <p>strong и b<strong>This is strong</strong> <b>This is b</b></p>
  <p>
    Playerunnknown Batllegrounds не очень <del>но это не точно</del> <ins>это точно</ins>.
    Тег q используется <q>для выделения в тексте цитат</q>. Содержимое контейнера автоматически отображается в браузере в кавычках.
  </p>
  <q>Это цитата в одну строку, тут только ковычки</q>
  <blockquote>
    Блэйз уже побывал во множестве боев — и всякий раз задает врагам жару. В этом обзоре мы собрали все, что
    нужно знать об этом новом герое-бойце, и советы, как за него играть.
  </blockquote>
  <cite><a href="https://battle.net/" target="_blank">battle.net</a></cite>
  <p> <em>em предназначен дедназначя акцентирования текста. Браузеры отображают такой текст курсивным начертанием. </em></p>
  <p>
    <i>
    i устанавливает курсивное начертание шрифта. Допустимо использовать этот тег совместно с другими тегами,
      которые определяют начертание текста.</i>
  </p>
  <hr>
  <dl>
    <dt>
      Очень рады с тобой познакомиться. Можешь коротко представить себя?
    </dt>
    <dd>
      Да, конечно. Меня зовут Эммали Гарридо, а в игре мой ник "EMUHLEET". Днем я работаю в качестве медсестры
      в центре вытрезвления и лечения алкогольной зависимости. А по ночам я – фулл-тайм прогеймер и лидер
      женской команды Team Dignitas по Counter-Strike: Global Offensive.
    </dd>
    <dt>
      Очень рады с тобой познакомиться. Можешь коротко представить себя?
    </dt>
    <dd>
      Да, конечно. Меня зовут Эммали Гарридо, а в игре мой ник "EMUHLEET". Днем я работаю в качестве медсестры
      в центре вытрезвления и лечения алкогольной зависимости. А по ночам я – фулл-тайм прогеймер и лидер
      женской команды Team Dignitas по Counter-Strike: Global Offensive.
    </dd>
  </dl>
  <ul>
    <li>
      Пиромания (D): Дает 25 ед. брони и наносит находящимся рядом противникам 40 ед. урона раз в 0.5 сек. в течение 4
      сек. Каждое попадание «Струей пламени» по герою сокращает время восстановления «Пиромании» на 5 сек.
    </li>
    <li>
      Второй буллет
    </li>
  </ul>
  <ol>
    <li>
      После паузы в 0.5 сек. совершает рывок, нанося первому герою на своем пути и находящимся рядом с ним героям 52 ед. урона, а также оглушая их на 1.25
    </li>
    <li>
      Второй пункт в списке
    </li>
  </ol>`
}
