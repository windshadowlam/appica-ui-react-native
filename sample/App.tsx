/**
 * Appica UI for React Native — component gallery.
 *
 * Demos EVERY exported component from `@appica/ui-react-native` so you can verify
 * look & behaviour on a real iOS / Android build. The app is wrapped in
 * `ThemeProvider` (required by every component) and `ToastProvider` (used by the
 * Toast demo).
 *
 * Run:
 *   iOS     – npm run ios      (needs Xcode + CocoaPods)
 *   Android – npm run android  (needs the Android SDK + an emulator/device)
 */
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {
  ThemeProvider,
  // Actions
  Button,
  ButtonGroup,
  Toolbar,
  // Inputs & forms
  Input,
  Textarea,
  TextField,
  NumberField,
  OtpField,
  Select,
  Combobox,
  Autocomplete,
  Field,
  Fieldset,
  Form,
  // Selection & toggles
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Toggle,
  ToggleGroup,
  Chip,
  // Data display
  Badge,
  Avatar,
  AvatarGroup,
  Kbd,
  Separator,
  Skeleton,
  Sparkline,
  Rating,
  Progress,
  Meter,
  Slider,
  Spinner,
  Loader,
  // Feedback & status
  Alert,
  Countdown,
  ToastProvider,
  useToast,
  // Layout & surfaces
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  ScrollArea,
  // Navigation
  Navigation,
  NavigationMenu,
  Breadcrumb,
  Menubar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Pagination,
  Toc,
  // Disclosure
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  // Overlays
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Drawer,
  AlertDialog,
  Popover,
  Tooltip,
  DropdownMenu,
  ContextMenu,
  PreviewCard,
  // Date & time
  Calendar,
  DatePicker,
  DateField,
  TimeField,
  // Media
  Thumbnail,
  Carousel,
  // Color
  ColorSwatch,
  ColorSwatchPicker,
  ColorSlider,
  ColorArea,
  // Decorative / motion
  BorderBeam,
  GradientGlow,
  BackgroundPattern,
  TextAnimate,
} from '@appica/ui-react-native';

/* ------------------------------------------------------------------ */
/* Layout helpers                                                     */
/* ------------------------------------------------------------------ */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

/* ------------------------------------------------------------------ */
/* Stateful demo wrappers                                             */
/* ------------------------------------------------------------------ */

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Row>
      <Button onPress={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogDescription>
            Get notified when new components land in the library.
          </DialogDescription>
          <Button onPress={() => setOpen(false)}>Got it</Button>
        </DialogContent>
      </Dialog>
    </Row>
  );
}

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Row>
      <Button variant="secondary" onPress={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side="right" size={300}>
        <View style={{ padding: 20, gap: 12 }}>
          <Text style={styles.bold}>Settings</Text>
          <Text style={styles.muted}>This panel slides in from the right.</Text>
          <Button onPress={() => setOpen(false)}>Close</Button>
        </View>
      </Drawer>
    </Row>
  );
}

function AlertDialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Row>
      <Button variant="destructive" onPress={() => setOpen(true)}>
        Delete…
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Keep"
        destructive
        onConfirm={() => setOpen(false)}
      />
    </Row>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Row>
      <Button
        variant="soft"
        onPress={() =>
          toast({
            title: 'Saved',
            description: 'Your changes were stored.',
            color: 'success',
            action: { label: 'Undo', onPress: () => {} },
          })
        }
      >
        Show Toast
      </Button>
    </Row>
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
}

function TocDemo() {
  const [active, setActive] = React.useState('s1');
  return (
    <Toc
      items={[
        { id: 's1', label: 'Getting started', level: 1 },
        { id: 's2', label: 'Installation', level: 1 },
        { id: 's3', label: 'Theming', level: 2 },
      ]}
      activeId={active}
      onSelect={setActive}
    />
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const carouselPages: React.ReactNode[] = ['#6366f1', '#ec4899', '#10b981'].map(
    (c, i) => (
      <View
        key={i}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: c,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
          Slide {i + 1}
        </Text>
      </View>
    ),
  );

  return (
    <ThemeProvider>
      <ToastProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scroll}>
              {/* Intro */}
              <View style={styles.hero}>
                <GradientGlow size={260} color="#6366f1" intensity={0.25} />
                <TextAnimate
                  text="Appica UI · React Native"
                  variant="slide-up"
                  style={styles.heroTitle}
                />
                <Text style={styles.heroSub}>
                  A gallery of every component in @appica/ui-react-native.
                </Text>
              </View>

              {/* Actions */}
              <Section title="Buttons & Actions">
                <Row>
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </Row>
                <Row>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button loading>Loading</Button>
                </Row>
                <Row>
                  <ButtonGroup>
                    <Button>Day</Button>
                    <Button>Week</Button>
                    <Button>Month</Button>
                  </ButtonGroup>
                </Row>
                <Row>
                  <Toolbar>
                    <Button size="sm" variant="ghost">B</Button>
                    <Button size="sm" variant="ghost">I</Button>
                    <Button size="sm" variant="ghost">U</Button>
                  </Toolbar>
                </Row>
              </Section>

              {/* Inputs & forms */}
              <Section title="Inputs & Forms">
                <Input placeholder="Email address" inputSize="md" clearable />
                <Textarea placeholder="Message…" numberOfLines={4} />
                <TextField
                  label="Full name"
                  placeholder="Jane Doe"
                  description="As it appears on your ID."
                />
                <NumberField defaultValue={3} min={0} max={10} step={1} />
                <OtpField length={6} />
                <Select
                  options={[
                    { label: 'Red', value: 'red' },
                    { label: 'Green', value: 'green' },
                    { label: 'Blue', value: 'blue' },
                  ]}
                  defaultValue="blue"
                />
                <Combobox
                  items={['Apple', 'Banana', 'Cherry', { label: 'Durian', value: 'durian' }]}
                  placeholder="Search a fruit…"
                />
                <Autocomplete items={['Tokyo', 'Toronto', 'Turin', 'Taipei']} />
                <Form>
                  <Fieldset legend="Account">
                    <Field label="Email" required description="We'll never share it.">
                      <Input placeholder="you@example.com" />
                    </Field>
                  </Fieldset>
                </Form>
              </Section>

              {/* Selection & toggles */}
              <Section title="Selection & Toggles">
                <Row>
                  <Switch defaultChecked />
                  <Switch />
                  <Checkbox defaultChecked />
                  <Checkbox />
                </Row>
                <CheckboxGroup defaultValue={['a', 'c']}>
                  <Row>
                    <Checkbox />
                    <Text style={styles.muted}>Option A</Text>
                    <Checkbox />
                    <Text style={styles.muted}>Option C</Text>
                  </Row>
                </CheckboxGroup>
                <RadioGroup defaultValue="1">
                  <Row>
                    <Radio value="1">One</Radio>
                    <Radio value="2">Two</Radio>
                    <Radio value="3">Three</Radio>
                  </Row>
                </RadioGroup>
                <Row>
                  <Toggle>Bold</Toggle>
                  <Toggle defaultPressed>Italic</Toggle>
                </Row>
                <ToggleGroup defaultValue={['b']} multiple>
                  <Toggle value="b">B</Toggle>
                  <Toggle value="i">I</Toggle>
                  <Toggle value="u">U</Toggle>
                </ToggleGroup>
                <Row>
                  <Chip selected onPress={() => {}}>
                    Selected
                  </Chip>
                  <Chip onPress={() => {}}>Filter</Chip>
                  <Chip disabled>Disabled</Chip>
                </Row>
              </Section>

              {/* Data display */}
              <Section title="Data Display">
                <Row>
                  <Badge color="primary">Primary</Badge>
                  <Badge color="success" appearance="solid">Success</Badge>
                  <Badge color="warning" appearance="outline">Warning</Badge>
                  <Badge color="error">Error</Badge>
                </Row>
                <Row>
                  <Avatar size={48}>AB</Avatar>
                  <Avatar
                    size={48}
                    source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                  />
                  <AvatarGroup max={3}>
                    <Avatar size={40}>A</Avatar>
                    <Avatar size={40}>B</Avatar>
                    <Avatar size={40}>C</Avatar>
                    <Avatar size={40}>D</Avatar>
                    <Avatar size={40}>E</Avatar>
                  </AvatarGroup>
                </Row>
                <Row>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                  <Separator style={styles.sep} />
                  <Skeleton width={160} height={16} />
                </Row>
                <Sparkline data={[3, 5, 2, 8, 4, 9, 6, 7]}
                  width={180}
                  height={48}
                  fill
                />
                <Rating defaultValue={4} max={5} />
                <Rating defaultValue={3.5} max={5} allowHalf readonly />
                <Progress value={65} />
                <Progress indeterminate />
                <Meter value={8} segments={12} />
                <Slider defaultValue={40} />
              </Section>

              {/* Feedback & status */}
              <Section title="Feedback & Status">
                <Alert color="info" title="Heads up" description="Core APIs demoed below." />
                <Alert color="success" title="Saved" description="All good." />
                <Alert color="error" title="Error" description="Something failed." />
                <Row>
                  <Spinner />
                  <Loader />
                  <Countdown date={new Date(Date.now() + 90 * 1000)} />
                  <ToastDemo />
                </Row>
              </Section>

              {/* Layout & surfaces */}
              <Section title="Layout & Surfaces">
                <Card frame="solid">
                  <CardMedia>
                    <Thumbnail
                      source={{ uri: 'https://picsum.photos/seed/appica/600/240' }}
                      width="100%"
                      height={140}
                      radius={0}
                    />
                  </CardMedia>
                  <CardHeader>
                    <CardTitle>Card title</CardTitle>
                    <CardDescription>A short supporting line.</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alice</TableCell>
                      <TableCell>Engineer</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bob</TableCell>
                      <TableCell>Designer</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableCaption>Team members</TableCaption>
                </Table>

                <ScrollArea style={styles.scrollArea}>
                  <View style={{ gap: 8, padding: 4 }}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <Text key={i} style={styles.muted}>
                        Scrollable row #{i + 1}
                      </Text>
                    ))}
                  </View>
                </ScrollArea>
              </Section>

              {/* Navigation */}
              <Section title="Navigation">
                <Navigation
                  links={[
                    { label: 'Home', active: true },
                    { label: 'Docs' },
                    { label: 'Pricing' },
                  ]}
                />
                <NavigationMenu
                  items={[
                    { value: 'products', label: 'Products', content: <Text style={styles.muted}>Product overview</Text> },
                    { value: 'company', label: 'Company', content: <Text style={styles.muted}>About us</Text> },
                  ]}
                />
                <Breadcrumb
                  items={[
                    { label: 'Home', onPress: () => {} },
                    { label: 'Library', onPress: () => {} },
                    { label: 'Components' },
                  ]}
                />
                <Menubar
                  menus={[
                    { label: 'File', items: [{ label: 'New', onSelect: () => {} }, { label: 'Open', onSelect: () => {} }] },
                    { label: 'Edit', items: [{ label: 'Undo', onSelect: () => {} }, { separator: true }, { label: 'Cut', onSelect: () => {} }] },
                  ]}
                />
                <Tabs defaultValue="a">
                  <TabsList>
                    <TabsTrigger value="a">Overview</TabsTrigger>
                    <TabsTrigger value="b">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="a">
                    <Text style={styles.muted}>Overview content.</Text>
                  </TabsContent>
                  <TabsContent value="b">
                    <Text style={styles.muted}>Activity content.</Text>
                  </TabsContent>
                </Tabs>
                <PaginationDemo />
                <TocDemo />
              </Section>

              {/* Disclosure */}
              <Section title="Disclosure">
                <Accordion type="single" defaultValue="1">
                  <AccordionItem value="1">
                    <AccordionTrigger>What is Appica?</AccordionTrigger>
                    <AccordionContent>
                      <Text style={styles.muted}>
                        A faithful React Native port of the Appica design system.
                      </Text>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger>Is it themable?</AccordionTrigger>
                    <AccordionContent>
                      <Text style={styles.muted}>
                        Yes — wrap your app in ThemeProvider.
                      </Text>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Collapsible defaultOpen>
                  <CollapsibleTrigger>
                    <Button variant="soft" size="sm">
                      Toggle details
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Text style={styles.muted}>Hidden until collapsed.</Text>
                  </CollapsibleContent>
                </Collapsible>
              </Section>

              {/* Overlays */}
              <Section title="Overlays">
                <DialogDemo />
                <DrawerDemo />
                <AlertDialogDemo />
                <Row>
                  <Popover
                    trigger={<Button variant="outline">Popover</Button>}
                  >
                    <Text style={styles.muted}>Floating panel content.</Text>
                  </Popover>
                  <Tooltip content="Tap for a hint">
                    <Button variant="outline">Tooltip</Button>
                  </Tooltip>
                  <DropdownMenu
                    trigger={<Button>Menu ▾</Button>}
                    items={[
                      { label: 'Edit', onSelect: () => {} },
                      { separator: true },
                      { label: 'Delete', destructive: true, onSelect: () => {} },
                    ]}
                  />
                  <ContextMenu
                    items={[
                      { label: 'Copy', onSelect: () => {} },
                      { label: 'Share', onSelect: () => {} },
                    ]}
                  >
                    <View style={styles.contextTarget}>
                      <Text style={styles.muted}>Long-press me</Text>
                    </View>
                  </ContextMenu>
                  <PreviewCard
                    content={
                      <View style={styles.previewCard}>
                        <Text style={{ color: '#fff' }}>Larger preview</Text>
                      </View>
                    }
                  >
                    <Text style={styles.link}>Inline link</Text>
                  </PreviewCard>
                </Row>
              </Section>

              {/* Date & time */}
              <Section title="Date & Time">
                <Calendar defaultValue={new Date()} />
                <DatePicker defaultValue={new Date()} />
                <DateField defaultValue={new Date()} />
                <TimeField hour={9} minute={30} />
              </Section>

              {/* Media */}
              <Section title="Media & Carousel">
                <Thumbnail
                  source={{ uri: 'https://picsum.photos/seed/x/200' }}
                  width={80}
                  height={80}
                  radius={12}
                  overlay={<Text style={{ color: '#fff' }}>▶</Text>}
                />
                <Carousel pages={carouselPages} style={{ alignSelf: 'stretch' }} />
              </Section>

              {/* Color */}
              <Section title="Color">
                <Row>
                  <ColorSwatch color="#ef4444" selected onSelect={() => {}} />
                  <ColorSwatch color="#f59e0b" onSelect={() => {}} />
                  <ColorSwatch color="#10b981" onSelect={() => {}} />
                </Row>
                <ColorSwatchPicker
                  colors={['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']}
                  defaultValue="#3b82f6"
                />
                <ColorSlider value={0.5} hue={210} onValueChange={() => {}} />
                <ColorArea hue={210} defaultValue={{ saturation: 1, value: 1 }} />
              </Section>

              {/* Decorative */}
              <Section title="Decorative & Motion">
                <BorderBeam>
                  <View style={styles.beamInner}>
                    <Text style={styles.bold}>Animated border beam</Text>
                  </View>
                </BorderBeam>
                <GradientGlow size={160} color="#ec4899" intensity={0.3} />
                <BackgroundPattern variant="grid" spacing={16} style={styles.bgMini}>
                  <Text style={styles.muted}>Grid pattern backdrop</Text>
                </BackgroundPattern>
              </Section>

              <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </ToastProvider>
    </ThemeProvider>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                             */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  bgPattern: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  hero: {
    alignItems: 'flex-start',
    paddingVertical: 28,
    paddingHorizontal: 4,
    position: 'relative',
  },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#0f172a' },
  heroSub: { marginTop: 8, fontSize: 14, color: '#475569' },
  section: { marginTop: 22 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
    marginBottom: 10,
  },
  sectionBody: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10 },
  sep: { width: 1, height: 28 },
  bold: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  muted: { fontSize: 14, color: '#475569' },
  link: { fontSize: 14, color: '#6366f1', fontWeight: '600' },
  scrollArea: { maxHeight: 160, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  contextTarget: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  previewCard: {
    width: 160,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beamInner: { padding: 28, alignItems: 'center' },
  bgMini: { padding: 16, borderRadius: 12, minHeight: 80, justifyContent: 'center' },
});
