import { DesktopNavigation } from './DesktopNavigation/DesktopNavigation'
import { MobileNavigation } from './MobileNavigation/MobileNavigation'

const Navigation = () => {
  return (
    <div data-testid="nav">
      <div className="hidden lg:block">
        <DesktopNavigation />
      </div>
      <div className="block lg:hidden">
        <MobileNavigation />
      </div>
    </div>
  )
}

export { Navigation }
