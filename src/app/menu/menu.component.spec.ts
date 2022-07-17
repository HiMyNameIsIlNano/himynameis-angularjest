import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, HostListener, Input } from '@angular/core';

describe('MenuComponent', () => {

  let component: MenuComponent;

  let allRouterLinkDebugElements: DebugElement[];
  let allRouterLinks: RouterLinkStubDirective[];

  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent, RouterLinkStubDirective],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    allRouterLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    allRouterLinks = allRouterLinkDebugElements.map(element => element.injector.get(RouterLinkStubDirective));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two routes', () => {
    expect(allRouterLinks.length).toBe(2);

    expect(allRouterLinks[0].linkParams).toEqual(['foo']);
    expect(allRouterLinks[1].linkParams).toEqual(['baz']);
  });

  it('should route to foo component', () => {
    const fooLinkDebugElement = allRouterLinkDebugElements[0];
    const fooLink = allRouterLinks[0];

    expect(fooLinkDebugElement).not.toBeUndefined();
    expect(fooLink.navigatedTo).toBeNull();
    fooLinkDebugElement.triggerEventHandler('click', fooLink);

    fixture.detectChanges();

    expect(fooLink.navigatedTo).toEqual(['foo']);
  });

  it('should route to baz component', () => {
    const fooLinkDebugElement = allRouterLinkDebugElements[1];
    const fooLink = allRouterLinks[1];

    expect(fooLinkDebugElement).not.toBeUndefined();
    expect(fooLink.navigatedTo).toBeNull();
    fooLinkDebugElement.triggerEventHandler('click', fooLink);

    fixture.detectChanges();

    expect(fooLink.navigatedTo).toEqual(['baz']);
  });
});

@Directive({
  selector: '[routerLink]'
})
class RouterLinkStubDirective {

  @Input('routerLink')
  public linkParams: any;

  navigatedTo: any = null;

  constructor() {
  }

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }

}
