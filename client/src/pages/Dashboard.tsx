import { ComponentCard } from '@/components/shared/component-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';

const colors = ['primary', 'success', 'error', 'warning', 'info', 'gray'] as const;

const modernPalette = [
  { name: 'Primary', hex: '#465FFF', background: 'bg-brand-500 hover:bg-brand-500', foreground: 'text-white hover:text-white' },
  { name: 'Primary hover', hex: '#3641F5', background: 'bg-brand-600 hover:bg-brand-600', foreground: 'text-white hover:text-white' },
  { name: 'Soft accent', hex: '#EEF2FF', background: 'bg-brand-50 hover:bg-brand-50', foreground: 'text-gray-800 hover:text-gray-800' },
  { name: 'Page background', hex: '#F9FAFB', background: 'bg-gray-50 hover:bg-gray-50', foreground: 'text-gray-800 hover:text-gray-800' },
  { name: 'Surface', hex: '#FFFFFF', background: 'bg-white hover:bg-white', foreground: 'text-gray-800 hover:text-gray-800' },
  { name: 'Primary text', hex: '#1D2939', background: 'bg-gray-800 hover:bg-gray-800', foreground: 'text-white hover:text-white' },
];
export default function Dashboard() {
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>FitLife</CardTitle> */}
        {/* <CardDescription></CardDescription> */}
      </CardHeader>

      <ComponentCard title="Palette" description="Mã hex">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {modernPalette.map((color) => (
            <Button
              key={color.hex}
              variant="outline"
              className={`${color.background} ${color.foreground}`}
              aria-label={`${color.name}: ${color.hex}`}
            >
              {color.hex}
            </Button>
          ))}
        </div>
      </ComponentCard>

      <ComponentCard title="Nút với các màu">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {colors.map((color) => <Badge key={color} variant="solid" color={color}>{color}</Badge>)}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {colors.map((color) => <Badge key={color} variant="light" color={color}>{color}</Badge>)}
        </div>
      </ComponentCard>

      <ComponentCard title="Nút mẫu">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </ComponentCard>
    </Card>
  );
}
